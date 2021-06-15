import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import quagga from "@ericblade/quagga2";

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)",
        width: 100,
        height: 100,
        padding: 0
    },
    input: {
        display: "none"
    },
    icon: {
        color: "#414141",
        fontSize: 72
    }
});
/**
 * 냉장고 재료 사진 바코드처리 컴포넌트
 */
const PictureButton = ({ handleBarcode }: any) => {
    const classes = useStyles();
    const handlePicture = async (e: any) => {
        console.log(URL.createObjectURL(e.target.files[0]));
        const pictureUrl = URL.createObjectURL(e.target.files[0]);
        if (pictureUrl === "") {
            alert("파일을 등록해주세요");
            return;
        }
        Decode(pictureUrl);
    };
    const Decode = (picture: string) => {
        quagga.decodeSingle(
            {
                numOfWorkers: 0, // Needs to be 0 when used within node
                inputStream: {
                    size: 800 // restrict input-size to be 800px in width (long-side)
                },
                decoder: {
                    readers: ["ean_reader"] // List of active readers
                },
                locate: false, // try to locate the barcode in the image
                src: picture
            },
            async (result) => {
                try {
                    if (result.codeResult) {
                        console.log(result.codeResult.code);

                        handleBarcode(
                            (
                                await axios.post("/food-manager/api/barcode", {
                                    barcode_number: result.codeResult.code
                                })
                            ).data
                        );
                    } else {
                        alert("바코드를 인식할수가 없습니다.");
                    }
                } catch (e) {
                    alert("등록되지 않은 바코드 입니다. 직접 입력해주세요.");
                }
            }
        );
    };
    return (
        <>
            <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handlePicture}
            />
            <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span" className={classes.root}>
                    <AddIcon className={classes.icon} />
                </IconButton>
            </label>
        </>
    );
};

export default PictureButton;
