import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as P5 from 'p5';

@Component({
  selector: 'app-gradient-descent',
  templateUrl: 'gradient-descent.component.html',
  styleUrls: ['gradient-descent.component.scss'],
})
export class GradientDescentComponent implements OnInit {
  private x_vals = [];
  private y_vals = [];

  private m;
  private b;

  private learningRate = 0.5;
  private optimizer = tf.train.sgd(this.learningRate);

  myP5 = new P5((p5) => {
    p5.setup = () => {
      this.myP5.createCanvas(400, 400);
      this.m = tf.variable(tf.scalar(this.myP5.random(1)));
      this.b = tf.variable(tf.scalar(this.myP5.random(1)));
    };

    const loss = (pred, labels) => {
      return pred
        .sub(labels)
        .square()
        .mean();
    };

    const predict = (x) => {
      const xs = tf.tensor1d(x);
      // y = mx + b;
      const ys = xs.mul(this.m).add(this.b);
      return ys;
    };

    p5.mousePressed = () => {
      const x = this.myP5.map(this.myP5.mouseX, 0, this.myP5.width, 0, 1);
      const y = this.myP5.map(this.myP5.mouseY, 0, this.myP5.height, 1, 0);
      this.x_vals.push(x);
      this.y_vals.push(y);
    };

    p5.draw = () => {
      tf.tidy(() => {
        if (this.x_vals.length > 0) {
          this.optimizer.minimize(() =>
            loss(predict(this.x_vals), tf.tensor1d(this.y_vals))
          );
        }
      });

      this.myP5.background(0);

      this.myP5.stroke(255);
      this.myP5.strokeWeight(8);
      for (let i = 0; i < this.x_vals.length; i++) {
        const px = this.myP5.map(this.x_vals[i], 0, 1, 0, this.myP5.width);
        const py = this.myP5.map(this.y_vals[i], 0, 1, this.myP5.height, 0);
        this.myP5.point(px, py);
      }

      const lineX = [0, 1];

      const ys = tf.tidy(() => predict(lineX));
      const lineY = ys.dataSync();
      ys.dispose();

      const x1 = this.myP5.map(lineX[0], 0, 1, 0, this.myP5.width);
      const x2 = this.myP5.map(lineX[1], 0, 1, 0, this.myP5.width);

      const y1 = this.myP5.map(lineY[0], 0, 1, this.myP5.height, 0);
      const y2 = this.myP5.map(lineY[1], 0, 1, this.myP5.height, 0);

      this.myP5.strokeWeight(2);
      this.myP5.line(x1, y1, x2, y2);

      console.log(tf.memory().numTensors);

      // noLoop();
    };
  });

  // private Engine = Matter.Engine;
  // private Render = Matter.Render;
  // private World = Matter.World;
  // private Bodies = Matter.Bodies;
  // private Composite = Matter.Composite;

  // private engine;

  // private boxA;
  // private boxB;
  // private ground;

  // myP5 = new P5((p5) => {
  //   p5.setup = () => {
  //     this.myP5.createCanvas(800, 600);

  //     // create an engine
  //     this.engine = this.Engine.create();

  //     // create two boxes and a ground
  //     this.boxA = this.Bodies.rectangle(400, 200, 80, 80);
  //     this.boxB = this.Bodies.rectangle(450, 50, 80, 80);
  //     this.ground = this.Bodies.rectangle(400, 610, 810, 60, {
  //       isStatic: true,
  //     });

  //     // add all of the bodies to the world
  //     this.World.add(this.engine.world, [this.boxA, this.boxB, this.ground]);

  //     // run the engine
  //     this.Engine.run(this.engine);
  //   };
  //   p5.draw = () => {
  //     this.myP5.background(51);

  //     // Basic demo
  //     // Getting vertices of each object
  //     let vertices = this.boxA.vertices;
  //     this.myP5.fill(255);
  //     this.myP5.beginShape();
  //     for (let i = 0; i < vertices.length; i++) {
  //       this.myP5.vertex(vertices[i].x, vertices[i].y);
  //     }
  //     this.myP5.endShape();

  //     // boxB vertices
  //     vertices = this.boxB.vertices;
  //     this.myP5.fill(255);
  //     this.myP5.beginShape();
  //     for (let i = 0; i < vertices.length; i++) {
  //       this.myP5.vertex(vertices[i].x, vertices[i].y);
  //     }
  //     this.myP5.endShape();

  //     // Ground vertices
  //     vertices = this.ground.vertices;
  //     this.myP5.beginShape();
  //     this.myP5.fill(127);
  //     for (let i = 0; i < vertices.length; i++) {
  //       this.myP5.vertex(vertices[i].x, vertices[i].y);
  //     }
  //     this.myP5.endShape();
  //   };
  // });

  // private angle = 0;
  // private diameter;
  // myP5 = new P5((p5) => {
  //   p5.setup = () => {
  //     this.myP5.createCanvas(this.myP5.windowWidth, this.myP5.windowHeight);
  //     this.diameter = this.myP5.height - 10;
  //     this.myP5.noStroke();
  //     this.myP5.fill(255, 204, 0);
  //   };
  //   p5.draw = () => {
  //     this.myP5.background(0);
  //     const d1 =
  //       10 +
  //       (this.myP5.sin(this.angle) * this.diameter) / 2 +
  //       this.diameter / 2;
  //     const d2 =
  //       10 +
  //       (this.myP5.sin(this.angle + this.myP5.PI / 2) * this.diameter) / 2 +
  //       this.diameter / 2;
  //     const d3 =
  //       10 +
  //       (this.myP5.sin(this.angle + this.myP5.PI) * this.diameter) / 2 +
  //       this.diameter / 2;
  //     this.myP5.ellipse(0, this.myP5.height / 2, d1, d1);
  //     this.myP5.ellipse(this.myP5.width / 2, this.myP5.height / 2, d2, d2);
  //     this.myP5.ellipse(this.myP5.width, this.myP5.height / 2, d3, d3);
  //     this.angle += 0.02;
  //   };
  // });
  // myP5 = new P5((p5) => {
  //   const canvasSize = 500,
  //     halfCanvasSize = canvasSize / 2;
  //   p5.setup = () => {
  //     this.myP5.createCanvas(500, 500);
  //     this.myP5.background(this.myP5.color(55, 105, 75));
  //     this.myP5.rectMode(this.myP5.CENTER);
  //     this.myP5.smooth();
  //   };
  //   p5.draw = () => {
  //     this.myP5.translate(this.myP5.width / 2, this.myP5.height / 2);
  //     if (!this.myP5.mouseIsPressed) {
  //       const size = this.myP5.constrain(
  //           this.myP5.mouseY / 3,
  //           10,
  //           this.myP5.mouseY / 3
  //         ),
  //         r = this.myP5.random(256),
  //         g = this.myP5.random(256),
  //         b = this.myP5.random(256),
  //         alpha = this.myP5.random(256);
  //       // center square
  //       this.myP5.push();
  //       this.myP5.noStroke();
  //       this.myP5.fill(this.myP5.color(r, g, b, alpha));
  //       this.myP5.rotate(this.myP5.radians(this.myP5.frameCount));
  //       this.myP5.rect(0, 0, size, size);
  //       this.myP5.pop();
  //       // Other squares
  //       if (this.myP5.frameCount % 5 === 0) {
  //         this.myP5.fill(this.myP5.color(255 - r, 255 - g, 255 - b, alpha));
  //       }
  //       this.myP5.rect(
  //         -halfCanvasSize + this.myP5.mouseX,
  //         -halfCanvasSize + this.myP5.mouseY,
  //         size,
  //         size
  //       );
  //       this.myP5.rect(
  //         halfCanvasSize - this.myP5.mouseX,
  //         halfCanvasSize - this.myP5.mouseY,
  //         size,
  //         size
  //       );
  //     }
  //   };
  // });

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}
