import React from "react";
import {
  CanvasPath,
  ExportImageType,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";

type Handlers = [string, () => void, string][];

interface InputFieldProps {
  fieldName: keyof ReactSketchCanvasProps;
  type?: string;
  canvasProps: Partial<ReactSketchCanvasProps>;
  setCanvasProps: React.Dispatch<
    React.SetStateAction<Partial<ReactSketchCanvasProps>>
  >;
}

function InputField({
  fieldName,
  type = "text",
  canvasProps,
  setCanvasProps,
}: InputFieldProps) {
  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setCanvasProps((prevCanvasProps: Partial<ReactSketchCanvasProps>) => ({
      ...prevCanvasProps,
      [fieldName]: target.value,
    }));
  };

  const id = "validation" + fieldName;

  return (
    <div className="p-2 col-12">
      <label htmlFor={id} className="form-label">
        {fieldName}
      </label>
      <input
        name={fieldName}
        type={type}
        className="form-control"
        id={id}
        value={canvasProps[fieldName] as string}
        onChange={handleChange}
        min={1}
        max={30}
      />
    </div>
  );
}

function DemoComponent() {
  const [canvasProps, setCanvasProps] = React.useState<
    Partial<ReactSketchCanvasProps>
  >({
    className: "Sourav-canvas",
    width: "100%",
    height: "100%",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#000000",
    canvasColor: "#FFFFFF",
    style: { borderRight: "1px solid #CCC" },
    svgStyle: {},
    exportWithBackgroundImage: true,
    withTimestamp: true,
    allowOnlyPointerType: "all",
  });

  const inputProps: Array<[keyof ReactSketchCanvasProps, "text" | "number"]> = [
    ["className", "text"],
    ["width", "text"],
    ["height", "text"],
    ["backgroundImage", "text"],
    ["strokeWidth", "number"],
    ["eraserWidth", "number"],
  ];

  const canvasRef = React.createRef<ReactSketchCanvasRef>();

  const [dataURI, setDataURI] = React.useState<string>("");
  const [svg, setSVG] = React.useState<string>("");
  const [paths, setPaths] = React.useState<CanvasPath[]>([]);
  const [lastStroke, setLastStroke] = React.useState<{
    stroke: CanvasPath | null;
    isEraser: boolean | null;
  }>({ stroke: null, isEraser: null });
  const [pathsToLoad, setPathsToLoad] = React.useState<string>("");
  const [sketchingTime, setSketchingTime] = React.useState<number>(0);
  const [exportImageType, setexportImageType] =
    React.useState<ExportImageType>("png");

  const imageExportHandler = async () => {
    alert(
      "you cant export this Demo tool, please register and login to export the image"
    );
  };

  const svgExportHandler = async () => {
    alert(
      "you cant export this Demo tool, please register and login to export the Svg file"
    );
  };

  const getSketchingTimeHandler = async () => {
    const getSketchingTime = canvasRef.current?.getSketchingTime;

    try {
      if (getSketchingTime) {
        const currentSketchingTime = await getSketchingTime();
        setSketchingTime(currentSketchingTime);
      }
    } catch {
      setSketchingTime(0);
      console.error("With timestamp is disabled");
    }
  };

  const penHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(false);
    }
  };

  const eraserHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(true);
    }
  };

  const undoHandler = () => {
    const undo = canvasRef.current?.undo;

    if (undo) {
      undo();
    }
  };

  const redoHandler = () => {
    const redo = canvasRef.current?.redo;

    if (redo) {
      redo();
    }
  };

  const clearHandler = () => {
    const clearCanvas = canvasRef.current?.clearCanvas;

    if (clearCanvas) {
      clearCanvas();
    }
  };

  const resetCanvasHandler = () => {
    const resetCanvas = canvasRef.current?.resetCanvas;

    if (resetCanvas) {
      resetCanvas();
    }
  };

  const createButton = (
    label: string,
    handler: () => void,
    themeColor: string
  ) => (
    <button
      key={label}
      className={`${themeColor} btn-block`}
      type="button"
      onClick={handler}
    >
      {label}
    </button>
  );

  const buttonsWithHandlers: Handlers = [
    ["Undo", undoHandler, "Undo"],
    ["Redo", redoHandler, "Redo"],
    ["Clear All", clearHandler, "Clear-All"],
    ["Reset All", resetCanvasHandler, "Reset-All"],
    ["Pen", penHandler, "Pen"],
    ["Eraser", eraserHandler, "Eraser"],
    ["Export Image", imageExportHandler, "Export-Image"],
    ["Export SVG", svgExportHandler, "Export-svg"],
    ["Get Sketching time", getSketchingTimeHandler, "Sketching-time"],
  ];

  const onChange = (updatedPaths: CanvasPath[]): void => {
    setPaths(updatedPaths);
  };

  return (
    <main className="container-fluid mt-4 mb-5">
      <div style={{ display: "flex" }} className="loginbox">
        <aside className="border-right tools-sidebar">
          <form>
            {inputProps.map(([fieldName, type]) => (
              <InputField
                key={fieldName}
                fieldName={fieldName}
                type={type}
                canvasProps={canvasProps}
                setCanvasProps={setCanvasProps}
              />
            ))}
          </form>
        </aside>
        <section className="col col-lg-9">
          <section
            style={{ display: "flex" }}
            className="no-gutters canvas-area m-0 p-0 loginbox"
          >
            <div
              className="col col-lg-9 canvas p-0"
              style={{
                border: "1px solid #c6c4c4",
                borderRadius: "5px",
                margin: "0px 10px",
              }}
            >
              <ReactSketchCanvas
                ref={canvasRef}
                onChange={onChange}
                onStroke={(stroke, isEraser) =>
                  setLastStroke({ stroke, isEraser })
                }
                {...canvasProps}
              />
            </div>
            <div className="col col-lg-3 panel">
              <div
                className=" mb-2 "
                style={{
                  background: "#ccf1f4",
                  padding: "20px",
                  borderRadius: "5px",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                <label className="col-12" htmlFor="dataURI">
                  Sketching time
                </label>
                <div id="sketchingTime" className="sketchingTime">
                  {(sketchingTime / 1000).toFixed(3)} sec
                </div>
              </div>
              <div className="d-grid gap-2">
                {buttonsWithHandlers.map(([label, handler, themeColor]) =>
                  createButton(label, handler, themeColor)
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default DemoComponent;
