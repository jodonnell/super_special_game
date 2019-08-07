class LevelMark extends Level {
  constructor(oss) {
    super();
    oss.NextLevel = LevelJacob;

    this.buildLevel(oss);
  }

  static level = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,"player",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"goal","wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall","wall","wall","wall",0,0,"break",0,0,0,"break",0,0,0,"break",0,"wall","wall","wall","wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","break",0,0,0,"break",0,0,0,"break",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}
