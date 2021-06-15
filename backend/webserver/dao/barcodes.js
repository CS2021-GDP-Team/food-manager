/**
 * 바코드 DB CRUD 구현
 */

class Barcodes {}

require('../utils/dbconnector')(Barcodes);

Barcodes.getBarcode = async (barcode_number) => {
    const [row, fields] = await Barcodes.db.execute("SELECT * FROM barcodes WHERE barcode=?", [barcode_number]);
    return row;
}

Barcodes.insertBarcode = async (barcode_number, name, hours, url) => {
    const found = await Barcodes.getBarcode(barcode_number);
    if(found.length > 0) throw `insertBarcode : duplicated barcode_number(${barcode_number})`
    hours = hours == null ? 336 : hours; // 기본 유통기한 14일
    url = url == null ? randomIngredientImage() : url;
    const [row, fields] = await Barcodes.db.execute("INSERT INTO barcodes(barcode, name, hours, url) VALUES(?,?,?,?)", [barcode_number, name, hours, url]);
    return row;
}

Barcodes.deleteBarcode = async (barcode_number) => {
	const [row, field] = await Barcodes.db.execute("DELETE FROM barcodes WHERE barcode=?", [barcode_number]);
}

randomIngredientImage = () => {
    images = [
        "https://image.flaticon.com/icons/png/512/985/985552.png",
        "https://images.vexels.com/media/users/3/224170/isolated/preview/82bbb2639aacf6d2a71c89e84c87aa5f-cooking-ingredients-logo-by-vexels.png",
        "https://play-lh.googleusercontent.com/gOsrDz5Fx9AYSC_ebI77KcEcqW_867t11Q6OwBd18RB-hzRDU9j10RLJBJLqOExIS0wA"
    ]
    idx = Math.floor(Math.random() * 2);
    return images[idx];
}

module.exports = Barcodes;
