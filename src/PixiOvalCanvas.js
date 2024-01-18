
import React, { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import flower from "./img/flower.jpg";

const PixiImage = () => {
  const [borderColor, setBorderColor] = useState(0xFF0000);

  useEffect(() => {
    // Create a Pixi application
    const app = new PIXI.Application({
      background: '#FFFFFF',
      width: 600,
      height: 600
    });

    // Append the Pixi canvas to the React component
    document.getElementById('pixi-image-container').appendChild(app.view);

    // Create a container for the entire scene
    const container = new PIXI.Container();

    // Load the image
    const texture = PIXI.Texture.from(flower);

    // Create a sprite with the loaded image
    const sprite = new PIXI.Sprite(texture);

    // Create a mask as a circle
    const mask = new PIXI.Graphics();
    mask.beginFill(0xFFFFFF);
    mask.drawCircle(app.view.width / 2, app.view.height / 2, 250); // Adjust radius as needed
    mask.endFill();

    // Add the mask to the container
    container.mask = mask;

    // Add the sprite to the container
    container.addChild(sprite);

    // Create a border for the circular mask
    const maskBorder = new PIXI.Graphics();
    maskBorder.lineStyle(30, borderColor, 1); // Border color and width
    maskBorder.drawCircle(app.view.width / 2, app.view.height / 2, 250);

    // Add the mask and border to the stage
    app.stage.addChild(mask, container, maskBorder);

    // Set the position and scale of the sprite
    sprite.anchor.set(0.5);
    sprite.position.set(app.view.width / 2, app.view.height / 2);
    sprite.scale.set(0.5, 0.5); // Adjust scale if necessary

    // Create a separate container for color buttons
    const colorButtonsContainer = new PIXI.Container();

    const colorOptions = [0xFF0000, 0x00FF00, 0x0000FF];

    // Create clickable color buttons
    colorOptions.forEach((color, index) => {
      const colorButton = new PIXI.Graphics();
      colorButton.beginFill(color);
      colorButton.drawRect(20 + index * 40, 10, 30, 30);
      colorButton.endFill();
      colorButton.interactive = true;
      colorButton.buttonMode = true;
      colorButton.on('pointerdown', () => handleColorChange(color));
      colorButtonsContainer.addChild(colorButton);  // Add this line to add the button to the container
    });

    // Add the color buttons container to the stage
    app.stage.addChild(colorButtonsContainer);

    const handleColorChange = (newColor) => {
      setBorderColor(newColor);
      maskBorder.clear();
      maskBorder.lineStyle(30, newColor, 1);
      maskBorder.drawCircle(app.view.width / 2, app.view.height / 2, 250);
    };

    // Cleanup function
    return () => {
      // Destroy the Pixi application to prevent memory leaks
      app.destroy(true);
    };
  }, [borderColor]);

  return <div id="pixi-image-container" />;
};

export default PixiImage;
