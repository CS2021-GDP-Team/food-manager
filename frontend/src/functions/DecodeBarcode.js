import Quagga from "quagga"; // ES6

const DecodeBarcode = {
    decode: function (src) {
        Quagga.decoder({ readers: ["ean_reader"] })
            .locator({ patchSize: "medium" })
            .fromImage(src, { size: 800 })
            .toPromise()
            .then(function (result) {
                console.log(result.codeResult.code);
            })
            .catch(function () {
                console.log(-1);
            });
    }
};

export default DecodeBarcode;
