import React, { useEffect } from 'react';
import pptxgen from 'pptxgenjs';
import { saveAs } from 'file-saver';

const Export = ({ state }) => {
  useEffect(() => {
    handleExport(state);
  }, [state]);

  const handleExport = (state) => {
    const pptx = new pptxgen();

    // Loop through each force and create a slide
    ['force1', 'force2', 'force3', 'force4', 'force5'].forEach((force) => {
      const slide = pptx.addSlide();

      // Add title for the force
      slide.addText(force, {
        x: 2,
        y: 0.8,
        fontSize: 24,
        bold: true,
      });

      // Check if the force exists in the state and has content
      if (state && state[force] && Array.isArray(state[force])) {
        const content = state[force].map((point) => point.input);

        // Add content to the slide
        const startY = 2;
        const lineHeight = 0.5;
        content.forEach((line, index) => {
          slide.addText(`• ${line}`, {
            x: 2.5,
            y: startY + index * lineHeight,
            fontSize: 16,
            bullet: true,
            autoFit: true,
          });
        });
      } else {
        // Add placeholder text if no content is available
        slide.addText('No data available', {
          x: 2.5,
          y: 2,
          fontSize: 16,
          autoFit: true,
        });
      }
    });

    // Download the PowerPoint file
    pptx.writeFile({
      fileName: 'PorterAnalysis.pptx',
      fileSaver: saveAs,
    });
  };

  return null;
};

export default Export;
