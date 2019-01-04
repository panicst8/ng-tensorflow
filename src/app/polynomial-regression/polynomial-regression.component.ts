import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as P5 from 'p5';

@Component({
  selector: 'app-polynomial-regression',
  templateUrl: './polynomial-regression.component.html',
  styleUrls: ['./polynomial-regression.component.scss'],
})
export class PolynomialRegressionComponent implements OnInit {
  private x_vals = [];
  private y_vals = [];

  private a;
  private b;
  private c;
  private d;
  private dragging = false;

  private learningRate = 0.2;
  private optimizer = tf.train.adam(this.learningRate);

  myP5 = new P5((p5) => {
    p5.setup = () => {
      this.myP5.createCanvas(400, 400);
      this.a = tf.variable(tf.scalar(this.myP5.random(-1, 1)));
      this.b = tf.variable(tf.scalar(this.myP5.random(-1, 1)));
      this.c = tf.variable(tf.scalar(this.myP5.random(-1, 1)));
      this.d = tf.variable(tf.scalar(this.myP5.random(-1, 1)));
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
      const ys = xs
        .pow(tf.scalar(3))
        .mul(this.a)
        .add(xs.square().mul(this.b))
        .add(xs.mul(this.c))
        .add(this.d);
      return ys;
    };

    p5.mousePressed = () => {
      this.dragging = true;
    };

    p5.mouseReleased = () => {
      this.dragging = false;
    };

    p5.draw = () => {
      if (this.dragging) {
        const x = this.myP5.map(this.myP5.mouseX, 0, this.myP5.width, -1, 1);
        const y = this.myP5.map(this.myP5.mouseY, 0, this.myP5.height, 1, -1);
        this.x_vals.push(x);
        this.y_vals.push(y);
      } else {
        tf.tidy(() => {
          if (this.x_vals.length > 0) {
            this.optimizer.minimize(() =>
              loss(predict(this.x_vals), tf.tensor1d(this.y_vals))
            );
          }
        });
      }

      this.myP5.background(0);

      this.myP5.stroke(255);
      this.myP5.strokeWeight(8);
      for (let i = 0; i < this.x_vals.length; i++) {
        const px = this.myP5.map(this.x_vals[i], -1, 1, 0, this.myP5.width);
        const py = this.myP5.map(this.y_vals[i], -1, 1, this.myP5.height, 0);
        this.myP5.point(px, py);
      }

      const curveX = [];
      for (let x = -1; x <= 1; x += 0.05) {
        curveX.push(x);
      }

      const ys = tf.tidy(() => predict(curveX));
      const curveY = ys.dataSync();
      ys.dispose();

      this.myP5.beginShape();
      this.myP5.noFill();
      this.myP5.stroke(255);
      this.myP5.strokeWeight(2);
      for (let i = 0; i < curveX.length; i++) {
        const x = this.myP5.map(curveX[i], -1, 1, 0, this.myP5.width);
        const y = this.myP5.map(curveY[i], -1, 1, this.myP5.height, 0);
        this.myP5.vertex(x, y);
      }
      this.myP5.endShape();

      console.log(tf.memory().numTensors);

      // noLoop();
    };
  });

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}
