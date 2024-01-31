// you can import some functions from other lib
// 现在你可以导入模块了
import { add } from "./lib";

// open aftereffect and create three layer and run this
// 打开ae 并且创建3个图层

const actDoc = app.activeDocument;

alert(actDoc.activeLayer.name.toString());
alert(add(1, 2).toString());
