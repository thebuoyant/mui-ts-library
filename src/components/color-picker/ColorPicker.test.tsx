import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { useState, type ComponentProps } from "react";
import { ColorPicker } from "./ColorPicker";

// ColorPicker is a standard controlled component: if onChange's output isn't fed back into
// `value`, the next render correctly "fights back" to the unchanged value prop — same semantics
// as any controlled <input>. Tests that span multiple sequential interactions (type, then blur)
// need this wrapper so the second interaction sees the first one's committed value, exactly like
// a real consumer.
function ControlledColorPicker(props: Omit<ComponentProps<typeof ColorPicker>, "value"> & { initialValue: string }) {
  const [value, setValue] = useState(props.initialValue);
  return (
    <ColorPicker
      {...props}
      value={value}
      onChange={(hex, info) => { setValue(hex); props.onChange(hex, info); }}
    />
  );
}

// jsdom never computes real layout — every getBoundingClientRect() call returns a
// zero-sized rect by default, which would divide-by-zero in the percentage math.
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Element.prototype as any).getBoundingClientRect = vi.fn(() => ({
    x: 0, y: 0, top: 0, left: 0, width: 200, height: 160, right: 200, bottom: 160, toJSON: () => {},
  }));
});

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (window as any).EyeDropper;
});

describe("ColorPicker", () => {
  it("Should render the gradient area, hue slider, and hex field", () => {
    render(<ColorPicker value="#1976d2" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Saturation and brightness")).toBeInTheDocument();
    expect(screen.getByLabelText("Hue")).toBeInTheDocument();
    expect(screen.getByLabelText("Hex value")).toHaveValue("#1976d2");
  });

  it("Should update saturation/brightness when dragging the gradient area", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    const gradient = screen.getByLabelText("Saturation and brightness");

    fireEvent.pointerDown(gradient, { clientX: 100, clientY: 0, pointerId: 1 });

    expect(handleChange).toHaveBeenCalled();
    const [hex, info] = handleChange.mock.calls.at(-1)!;
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    // x=100 of 200px wide → HSV s=50%, y=0 (top) → HSV v=100% → lightened red.
    expect(info.rgb.r).toBe(255);
    expect(info.rgb.g).toBeCloseTo(128, 0);
    expect(info.rgb.b).toBeCloseTo(128, 0);
  });

  it("Should update hue when dragging the hue slider", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    const hueSlider = screen.getByLabelText("Hue");

    fireEvent.pointerDown(hueSlider, { clientX: 100, clientY: 0, pointerId: 1 });

    const [, info] = handleChange.mock.calls.at(-1)!;
    expect(info.hsl.h).toBeCloseTo(180, 0); // x=100 of 200px wide → 50% of 360 = 180
  });

  it("Should update alpha when dragging the alpha slider", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    // Both the slider and the numeric alpha field share the "Alpha" accessible name —
    // the slider (role="slider") renders first in DOM order.
    const alphaSlider = screen.getAllByLabelText("Alpha")[0];

    fireEvent.pointerDown(alphaSlider, { clientX: 50, clientY: 0, pointerId: 1 });

    const [hex] = handleChange.mock.calls.at(-1)!;
    expect(hex).toMatch(/^#[0-9a-f]{8}$/); // alpha < 1 → 8-digit hex
  });

  it("Should not render the alpha slider/field when showAlpha is false", () => {
    render(<ColorPicker value="#ff0000" onChange={vi.fn()} showAlpha={false} />);
    expect(screen.queryAllByLabelText("Alpha")).toHaveLength(0);
  });

  it("Should commit a value typed into the hex field", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText("Hex value"), { target: { value: "#00ff00" } });

    const [hex] = handleChange.mock.calls.at(-1)!;
    expect(hex).toBe("#00ff00");
  });

  it("Should ignore an invalid in-progress hex value without calling onChange", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText("Hex value"), { target: { value: "#ff" } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("Should switch to RGB fields and commit a typed component", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} defaultFormat="rgb" />);

    expect(screen.getByLabelText("Red")).toHaveValue("255");
    fireEvent.change(screen.getByLabelText("Green"), { target: { value: "128" } });

    const [, info] = handleChange.mock.calls.at(-1)!;
    expect(info.rgb.g).toBe(128);
  });

  it("Should switch to HSL fields and commit a typed component", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} defaultFormat="hsl" />);

    expect(screen.getByLabelText("Saturation")).toHaveValue("100");
    fireEvent.change(screen.getByLabelText("Lightness"), { target: { value: "20" } });

    const [, info] = handleChange.mock.calls.at(-1)!;
    expect(info.hsl.l).toBe(20);
  });

  it("Should call onFormatChange when the format dropdown changes", () => {
    const handleFormatChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={vi.fn()} onFormatChange={handleFormatChange} />);
    fireEvent.mouseDown(screen.getByLabelText("Color format"));
    fireEvent.click(screen.getByRole("option", { name: "RGB" }));
    expect(handleFormatChange).toHaveBeenCalledWith("rgb");
  });

  it("Should select a saved color swatch", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} savedColors={["#00ff00", "#0000ff"]} />);

    fireEvent.click(screen.getByRole("button", { name: "#0000ff" }));

    const [hex] = handleChange.mock.calls.at(-1)!;
    expect(hex).toBe("#0000ff");
  });

  it("Should not render a saved-colors section when the list is empty", () => {
    render(<ColorPicker value="#ff0000" onChange={vi.fn()} />);
    expect(screen.queryByText("Saved colors")).not.toBeInTheDocument();
  });

  it("Should not render the eyedropper button when the EyeDropper API is unsupported", () => {
    render(<ColorPicker value="#ff0000" onChange={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Pick color from screen" })).not.toBeInTheDocument();
  });

  it("Should render and use the eyedropper button when the EyeDropper API is available", async () => {
    const open = vi.fn().mockResolvedValue({ sRGBHex: "#abcdef" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).EyeDropper = vi.fn().mockImplementation(function (this: { open: typeof open }) { this.open = open; });

    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    const button = screen.getByRole("button", { name: "Pick color from screen" });
    fireEvent.click(button);
    await vi.waitFor(() => expect(open).toHaveBeenCalled());
    await vi.waitFor(() => expect(handleChange).toHaveBeenCalled());

    const [hex] = handleChange.mock.calls.at(-1)!;
    expect(hex).toBe("#abcdef");
  });

  it("Should not throw when the eyedropper is cancelled", async () => {
    const open = vi.fn().mockRejectedValue(new Error("cancelled"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).EyeDropper = vi.fn().mockImplementation(function (this: { open: typeof open }) { this.open = open; });

    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Pick color from screen" }));
    await vi.waitFor(() => expect(open).toHaveBeenCalled());
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("Should not fire onChange when disabled and the gradient area is interacted with", () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={handleChange} disabled />);
    fireEvent.pointerDown(screen.getByLabelText("Saturation and brightness"), { clientX: 100, clientY: 0, pointerId: 1 });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("Should re-sync from an externally changed value prop", () => {
    const { rerender } = render(<ColorPicker value="#ff0000" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Hex value")).toHaveValue("#ff0000");

    rerender(<ColorPicker value="#00ff00" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Hex value")).toHaveValue("#00ff00");
  });

  it("Should render a hidden input for form integration when name is set", () => {
    render(<ColorPicker value="#1976d2" onChange={vi.fn()} name="brandColor" />);
    const hidden = document.querySelector('input[type="hidden"][name="brandColor"]') as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden.value).toBe("#1976d2");
  });

  it("Should not render a hidden input without name", () => {
    render(<ColorPicker value="#1976d2" onChange={vi.fn()} />);
    expect(document.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
  });

  it("Should support custom translations", () => {
    render(
      <ColorPicker
        value="#1976d2"
        onChange={vi.fn()}
        translation={{ hexFieldLabel: "Hex-Wert", savedColorsLabel: "Gespeicherte Farben" }}
        savedColors={["#ff0000"]}
      />,
    );
    expect(screen.getByLabelText("Hex-Wert")).toBeInTheDocument();
    expect(screen.getByText("Gespeicherte Farben")).toBeInTheDocument();
  });

  it("Should accept rgb()/rgba() and hsl()/hsla() as the initial value", () => {
    const { rerender } = render(<ColorPicker value="rgb(255, 0, 0)" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Hex value")).toHaveValue("#ff0000");

    rerender(<ColorPicker value="hsl(120, 100%, 50%)" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Hex value")).toHaveValue("#00ff00");
  });

  // Regression: a plain `left: 100%` thumb position lets the thumb's own radius push half of
  // it past the track edge — both the gradient-area thumb and the slider thumbs must stay
  // fully inside the track at 0% and 100%.
  describe("Thumb positioning stays within track bounds", () => {
    // MUI's `sx` prop renders these as a generated CSS class, not an inline `style` attribute —
    // `toHaveStyle` resolves the actual matched rule, an inline-style check would read empty.
    it("Should inset the gradient-area thumb at full saturation (s=100)", () => {
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} />); // pure red: s=100, v=100
      const thumb = screen.getByLabelText("Saturation and brightness").firstElementChild as HTMLElement;
      // thumbSize=16 (default "medium" size) — center inset by 8px from each edge, never flush against it.
      expect(thumb).toHaveStyle({ left: "calc(8px + 1 * (100% - 16px))" });
    });

    it("Should inset the hue-slider thumb at hue=0 (left edge)", () => {
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} />); // pure red: h=0
      const hueThumb = screen.getByLabelText("Hue").firstElementChild as HTMLElement;
      expect(hueThumb).toHaveStyle({ left: "calc(8px + 0 * (100% - 16px))" });
    });
  });

  describe("inputSize", () => {
    it("Should apply the same size to the format select, value field, and alpha field", () => {
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} inputSize="small" />);
      const formatSelect = screen.getByLabelText("Color format").closest(".MuiInputBase-root");
      const hexField = screen.getByLabelText("Hex value").closest(".MuiInputBase-root");
      const alphaField = screen.getAllByLabelText("Alpha")[1].closest(".MuiInputBase-root"); // [0] is the slider
      expect(formatSelect).toHaveClass("MuiInputBase-sizeSmall");
      expect(hexField).toHaveClass("MuiInputBase-sizeSmall");
      expect(alphaField).toHaveClass("MuiInputBase-sizeSmall");
    });

    it("Should render the format select at the same font-size (and therefore height) as the hex field", () => {
      // A `size`/`MuiInputBase-size*` class match alone doesn't guarantee equal rendered
      // height — MUI derives input height from padding *and* line-height, and line-height
      // scales with font-size. A stray `fontSize` override on just one of the two fields
      // (as previously existed on the format Select) makes it visibly shorter even though
      // both report the same MUI size class.
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} />);
      const formatSelect = screen.getByRole("combobox", { name: "Color format" });
      const hexField = screen.getByLabelText("Hex value");
      expect(formatSelect.closest(".MuiInputBase-root")).toHaveStyle({ fontSize: "1rem" });
      expect(hexField.closest(".MuiInputBase-root")).toHaveStyle({ fontSize: "1rem" });
    });
  });

  describe("showSliderSection / showInputSection", () => {
    it("Should hide the eyedropper and hue/alpha sliders when showSliderSection is false", () => {
      const open = vi.fn().mockResolvedValue({ sRGBHex: "#abcdef" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).EyeDropper = vi.fn().mockImplementation(function (this: { open: typeof open }) { this.open = open; });

      render(<ColorPicker value="#ff0000" onChange={vi.fn()} showSliderSection={false} />);
      expect(screen.queryByLabelText("Hue")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Pick color from screen" })).not.toBeInTheDocument();
      // The gradient area and the input section stay visible.
      expect(screen.getByLabelText("Saturation and brightness")).toBeInTheDocument();
      expect(screen.getByLabelText("Hex value")).toBeInTheDocument();
    });

    it("Should hide the format dropdown and value fields when showInputSection is false", () => {
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} showInputSection={false} />);
      expect(screen.queryByLabelText("Hex value")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Color format")).not.toBeInTheDocument();
      // The gradient area and the slider section stay visible.
      expect(screen.getByLabelText("Saturation and brightness")).toBeInTheDocument();
      expect(screen.getByLabelText("Hue")).toBeInTheDocument();
    });
  });

  describe("onChangeCommitted", () => {
    it("Should not fire while dragging the gradient area, only on pointer-up", () => {
      const handleCommitted = vi.fn();
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} onChangeCommitted={handleCommitted} />);
      const gradient = screen.getByLabelText("Saturation and brightness");

      fireEvent.pointerDown(gradient, { clientX: 100, clientY: 0, pointerId: 1 });
      fireEvent.pointerMove(gradient, { clientX: 120, clientY: 0, pointerId: 1, buttons: 1 });
      expect(handleCommitted).not.toHaveBeenCalled();

      fireEvent.pointerUp(gradient, { pointerId: 1 });
      expect(handleCommitted).toHaveBeenCalledTimes(1);
    });

    it("Should fire once on blur after typing in the hex field, not per keystroke", () => {
      const handleCommitted = vi.fn();
      render(<ControlledColorPicker initialValue="#ff0000" onChange={vi.fn()} onChangeCommitted={handleCommitted} />);
      const hexField = screen.getByLabelText("Hex value");

      fireEvent.change(hexField, { target: { value: "#00ff00" } });
      expect(handleCommitted).not.toHaveBeenCalled();

      fireEvent.blur(hexField);
      expect(handleCommitted).toHaveBeenCalledTimes(1);
      const [hex] = handleCommitted.mock.calls[0];
      expect(hex).toBe("#00ff00");
    });

    it("Should fire immediately when a saved-color swatch is clicked", () => {
      const handleCommitted = vi.fn();
      render(
        <ColorPicker
          value="#ff0000"
          onChange={vi.fn()}
          onChangeCommitted={handleCommitted}
          savedColors={["#0000ff"]}
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "#0000ff" }));
      expect(handleCommitted).toHaveBeenCalledTimes(1);
      expect(handleCommitted.mock.calls[0][0]).toBe("#0000ff");
    });

    it("Should fire immediately when the eyedropper picks a color", async () => {
      const open = vi.fn().mockResolvedValue({ sRGBHex: "#abcdef" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).EyeDropper = vi.fn().mockImplementation(function (this: { open: typeof open }) { this.open = open; });

      const handleCommitted = vi.fn();
      render(<ColorPicker value="#ff0000" onChange={vi.fn()} onChangeCommitted={handleCommitted} />);
      fireEvent.click(screen.getByRole("button", { name: "Pick color from screen" }));
      await vi.waitFor(() => expect(handleCommitted).toHaveBeenCalled());
      expect(handleCommitted.mock.calls[0][0]).toBe("#abcdef");
    });
  });
});
