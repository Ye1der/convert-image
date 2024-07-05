import inquirer from 'inquirer';
import path from 'path';
import { it, describe, vi, expect } from 'vitest';
import { files } from '../files.js';
import fs from 'node:fs/promises';
const localRoute = process.argv[1];
const rootRoute = path.join(path.dirname(localRoute), '../../../../../');
const imageRoute = path.join(rootRoute, '/public/test.jpg');
describe('Function files', () => {
    it('Should convert the image .jpg to .png', async () => {
        vi.spyOn(inquirer, 'prompt')
            .mockResolvedValueOnce({ route: imageRoute })
            .mockResolvedValueOnce({ type: 'png' })
            .mockResolvedValueOnce({ verify: false })
            .mockResolvedValueOnce({ verify: true });
        await files();
        const routeNewImage = imageRoute.replace('jpg', 'png');
        const existNewImage = await fs.stat(routeNewImage);
        expect(existNewImage.isFile()).toBe(true);
        await fs.unlink(routeNewImage);
    });
    it('Should convert the image .jpg to .png and to webp', async () => {
        vi.spyOn(inquirer, 'prompt')
            .mockResolvedValueOnce({ route: imageRoute })
            .mockResolvedValueOnce({ type: 'png' })
            .mockResolvedValueOnce({ verify: true })
            .mockResolvedValueOnce({ route: imageRoute })
            .mockResolvedValueOnce({ type: 'webp' })
            .mockResolvedValueOnce({ verify: false })
            .mockResolvedValueOnce({ verify: true });
        await files();
        const existNewImagePng = await fs.stat(imageRoute.replace('jpg', 'png'));
        const existNewImageWebp = await fs.stat(imageRoute.replace('jpg', 'webp'));
        expect(existNewImagePng.isFile()).toBe(true);
        expect(existNewImageWebp.isFile()).toBe(true);
        await fs.unlink(imageRoute.replace('jpg', 'png'));
        await fs.unlink(imageRoute.replace('jpg', 'webp'));
    });
});
