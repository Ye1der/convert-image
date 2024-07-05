import path from 'path';
import sharp from 'sharp';
import { formats } from './constants.js';
export async function convertImage({ url, format }) {
    return new Promise((resolve, reject) => {
        const formatImage = path.extname(url).replace('.', '');
        const nameImage = path.basename(url);
        if (!formats.includes(formatImage)) {
            reject(`La imagen ${nameImage} tiene un formato no soportado`);
        }
        try {
            sharp(url)
                .toFormat(format)
                .toFile(url.replace(formatImage, format), (err, info) => {
                if (err) {
                    reject('Error al convertir la imagen ' + nameImage);
                }
                else {
                    resolve(`Imagen ${nameImage} convertida a ${format}`);
                }
            });
        }
        catch (error) {
            reject('Error al convertir la imagen ' + nameImage);
        }
    });
}
