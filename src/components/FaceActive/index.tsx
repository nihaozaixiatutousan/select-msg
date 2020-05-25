import React, { Component, RefObject } from "react";
import "./index.css";
import { trimInit, sliceStr, fillStr } from "./utils";

class FaceActive extends Component {
  my: RefObject<any>;
  mytexl: RefObject<any>;
  mytexr: RefObject<any>;

  
  constructor(props: any) {
    super(props);
    this.my = React.createRef();
    this.mytexl = React.createRef();
    this.mytexr = React.createRef();
    this.handleInputFile = this.handleInputFile.bind(this);
  }

    
  handleInputFile(e: any) {
    // console.log(this.my.current.value);
    let file: any;
    const self = this;
    file = e.target.files[0];
    // 读取文件内容
    let reader = new FileReader();
    reader.readAsText(file, "gbk");
    reader.onloadend = function (e) {
      let formatData: any[] = [];
      let a = this.result;
      let text = (a as string).split("\n");

      const mapFocus: string = "定位点";
      const need2: string = "文字内容";
      function filtelText(text: any) {
        // eslint-disable-next-line array-callback-return
        text.filter((x: any): void => {
          const formatContent = trimInit(x);
          if (
            mapFocus === formatContent.slice(0, 3) ||
            need2 === formatContent.slice(0, 4)
          ) {
            formatData.push(formatContent);
          }
        });
        // TODO : 查找重复的字符串
        // for (let i = 1; i < formatData.length; i++) {
        //   if (
        //     formatData[i - 1].slice(0, 3) === formatData[i].slice(0, 3)
        //   ) {
        //     formatData.splice(i - 1);

        //     // console.log(formatData);
        //     break;
        //   }
        // }
        if (formatData[0] === "undefined") {
          alert("please formatData  variable error message !!");
        }
        const cloneData = formatData;
        let ineedData = [];
        for (let i = 0; i < formatData.length; i++) {
          if (i % 2 !== 0) {
            ineedData.push(formatData[i]);
          }
        }

        let mapDataxy: any[] = [];
        let mapDataX = [];
        let mapDataY = [];

        cloneData.filter((value) => {
          if (value.slice(0, 3) === mapFocus) {
            let valueStr = value.substring(4).trim();
            mapDataxy.push(valueStr.split(","));
          }
        });
        // // 用mapDataxy[0][0] 来定义。
        for (let i = 0; i < mapDataxy.length; i++) {
          mapDataX.push(parseFloat(mapDataxy[i][0]));
          mapDataY.push(parseFloat(mapDataxy[i][1]));
        }

        function sortArr(arr: any[], arrin: any[], arrinto: any[]) {
          let len = arr.length;
          for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i; j++) {
              if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                temp = arrin[j + 1];
                arrin[j + 1] = arrin[j];
                arrin[j] = temp;
                temp = arrinto[j + 1];
                arrinto[j + 1] = arrinto[j];
                arrinto[j] = temp;
              }
            }
          }
          return { arrin, arrinto };
        }
        let { arrin: newArrin, arrinto: newArrinto } = sortArr(
          mapDataX,
          ineedData,
          mapDataY
        );
        let arrPartone:any[] = [],
            arrParttwo:any[] = [];
        for (let i = 0; i < newArrin.length; i++) {
          if (i % 2 === 0) {
            arrPartone.push([newArrin[i], newArrinto[i]]);
          } else {
            arrParttwo.push([newArrin[i], newArrinto[i]]);
          }
        }

        // console.log(arrPartone,arrParttwo);
        //
        let arrPartlen: number = arrPartone.length;
        let arrOneText:any[] = [],
          arrTwoText:any[] = [];
        for (let i = 0; i < arrPartlen; i++) {
          if (arrPartone[i][1] > arrParttwo[i][1]) {
            [arrPartone[i][0], arrParttwo[i][0]] = [
              arrParttwo[i][0],
              arrPartone[i][0],
            ];
          }
          arrOneText.push(arrPartone[i][0]);
          arrTwoText.push(arrParttwo[i][0]);
        }

        function endReData(arr: any[]) {
          let newArr: any[] = [];
          let oneslilen, twoslilen, oneslicon, twoslicon;

          // eslint-disable-next-line array-callback-return
          arr.filter((value) => {
            if(value === undefined){
              console.log('-- 000 --');
              alert('您的导出方式有误，请查看说明！！');
            }
            if (value.indexOf("{") === -1) {
              twoslilen = fillStr(value, ";");
              twoslicon = sliceStr(value, twoslilen + 1);
              newArr.push(twoslicon);
            } else if (value.indexOf("{") !== -1) {
              oneslilen = fillStr(value, "{");
              oneslicon = sliceStr(value, oneslilen);
              twoslilen = fillStr(oneslicon, ";");
              twoslicon = sliceStr(oneslicon, twoslilen + 1);
              twoslicon = twoslicon.replace("}", "");
              newArr.push(twoslicon);
            }
          });
          return newArr;
        }
        let endArrOneContent = endReData(arrOneText);
        let endArrTwoContent = endReData(arrTwoText);


        return { endArrOneContent, endArrTwoContent };
      }

      //   // filter content
      const {
        endArrOneContent: endArrOneContentLight,
        endArrTwoContent: endArrTwoContentRight,
      } = filtelText(text);

      self.mytexl.current.value = endArrOneContentLight.join('\n');
      self.mytexr.current.value = endArrTwoContentRight.join('\n');
      self.my.current.value = null;
    };
  }
  render() {
    return (
      <div className="bodes">
        <a href="#" className="a-upload">
          <input
            type="file"
            id="hha"
            ref={this.my}
            className="file"
            onChange={this.handleInputFile}
            accept="text/plain"
          />
          导入文件
        </a>

        <div id="output"></div>

        <textarea name="" ref={this.mytexl} id="texl"></textarea>
        <textarea name="" ref={this.mytexr} id="texr"></textarea>
        <div>
          <span>说明：</span>
          <h3>
            <span className="redcolor">
              1.高压系统图导出文字时，先将系统图边框删除{" "}
            </span>
            （横向选中删除即可）
          </h3>
          <h3>2.系统图内文字若为块创建，则不能导出</h3>
          <h3>3.低压系统图导出文字时，需要手动选中柜名称与柜编号</h3>
        </div>
        <div>
          <span>制作：</span>
          天津公司总经办
          <h3>
            联系电话：<span>022-8688-6562</span>
          </h3>
        </div>
      </div>
    );
  }
}

export default FaceActive;
