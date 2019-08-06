class BuzzSaw {
  constructor(x, y, pallet, diameter, waypoints) {
    this.x = x;
    this.y = y;
    this.angle = 20;
    this.speed = 15;
    this.waypoints = waypoints;
    this.direction = RIGHT;
    this.pallet = pallet;
    this.originalPallet = pallet;
    this.waypointIndex = 0;
    this.elapsedTime = null;
    this.collisionBounds = new CollisionBoundsRect(this);

    this.dimensions = new RectDimensions(
      diameter,
      diameter,
    );
  }

  resetPallet() {
    this.pallet = this.originalPallet;
  }

  update({ tick }) {
    this.elapsedTime = this.elapsedTime || 0.001;
    this.elapsedTime += tick;

    this.startX = _.isNumber(this.startX) ? this.startX : this.x;
    this.startY = _.isNumber(this.startY) ? this.startY : this.y;

    this.dimensions.setPos(this.x, this.y);
    this.updateAngle();
    this.updatePos(tick);
  }

  updatePos() {
    const waypoint = this.waypoints[this.waypointIndex];
    const percentThrough = Math.min((this.elapsedTime / 1000) / waypoint.time, 1);

    this.x = ((waypoint.x - this.startX) * percentThrough) + this.startX;
    this.y = ((waypoint.y - this.startY) * percentThrough) + this.startY;

    if (percentThrough >= 1) {
      this.nextWaypoint();
    }
  }

  nextWaypoint() {
    this.waypointIndex++;
    if (this.waypointIndex > this.waypoints.length - 1) {
      this.waypointIndex = 0;
    }

    this.elapsedTime = null;
    this.startX = null;
    this.startY = null;
  }

  updateAngle() {
    this.angle += this.speed;
    this.angle %= 360;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x + this.dimensions.width() / 2, this.y + this.dimensions.height() / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = "white";
    ctx.fillRect(-this.dimensions.width() / 2, -this.dimensions.width() / 2, this.dimensions.width(), this.dimensions.height());
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillStyle = this.pallet[1];
    ctx.fillRect(-this.dimensions.width() / 2, -this.dimensions.width() / 2, this.dimensions.width(), this.dimensions.height());
    ctx.fillStyle = this.pallet[0];
    ctx.fillRect(-7, -7, 14, 14);
    ctx.restore();
  }
}
