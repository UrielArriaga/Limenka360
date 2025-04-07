import React, { useEffect } from "react";
import { useMount, useSetState } from "react-use";

export default function useTourAddProducts(view) {
  const [tourState, setTourState] = useSetState({
    run: false,
    sidebarOpen: false,
    stepIndex: 0,
    steps: [],
  });

  const { stepIndex, steps, sidebarOpen, run } = tourState;

  useEffect(() => {
    if (view === "productsEdit") {
      setTimeout(() => {
        setTourState({
          run: true,
          steps: [
            {
              target: ".sectionpackages", // Elemento en la página
              placement: "top-start",
              content: (
                <div>
                  <h3>Productos para desglose</h3>
                  Los productos con el icono de desglose se mostrarán aquí.
                  <br />
                </div>
              ),
            },
            {
              target: ".tour-btnpackagesssss", // Elemento en la página
              content: "Todos los productos que requieran un desglose se mostrarán aquí.",
            },

            {
              target: ".tour-btnpackagesbs", // Elemento en la página
              content: "Todos los productos que requieran un desglose se mostrarán aquí.",
            },
          ],
        });
      }, 1000);
    }
  }, [view]);

  const handleJoyrideCallback = data => {
    const { status, type } = data;
  };

  const handleClickStart = () => {
    setTourState({ run: true });
  };

  //   useMount(() => {
  //     setState({
  //       run: true,
  //       steps: [
  //         {
  //           target: ".sectionpackages", // Elemento en la página
  //           content: "Todos los productos que requieran un desglose se mostrarán aquí.",
  //         },
  //       ],
  //     });
  //   });

  return {
    tourControl: {
      run,
      sidebarOpen,
      stepIndex,
      steps,
      tourState,
      setTourState,
    },
  };
}
