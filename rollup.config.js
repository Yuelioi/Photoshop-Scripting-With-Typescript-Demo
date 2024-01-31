import * as fs from "fs";
import { spawn } from "child_process";

import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

// optional: A Rollup plugin to generate a minified bundle with terser.
// 可选: 压缩代码
import terser from "@rollup/plugin-terser";

// optional: covert jsx file to jsxbin
// 可选: 可以转为二进制
import jsxbin2 from "rollup-plugin-jsxbin2";

// 设置你的输入文件和输出文件路径
const input = "./src/main.tsx";
const output = "./dist/output.jsx";

const config = {
    input: input,
    output: output,
    build: {
        jsxBin: true,
        compress: true,
    },
    extensions: [".ts", ".tsx"],
};

export default {
    input: input,
    output: [
        {
            file: output,
            format: "cjs",
        },
        {
            file: output.replace(".jsx", ".min.jsx"),
            format: "cjs",
            plugins: [terser()],
        },
        {
            file: output.replace(".jsx", ".jsxbin"),
            format: "cjs",
            plugins: [jsxbin2({ file: output })],
        },
    ],
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        {
            name: "clean-dist",
            buildStart() {
                if (fs.existsSync("dist")) {
                    fs.rmSync("dist", { recursive: true });
                }
            },
        },
    ],
};
