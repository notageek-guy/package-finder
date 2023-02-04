import type { NextApiRequest, NextApiResponse } from 'next'

import { JSDOM } from 'jsdom';


export default async function getDownloads(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { packageName } = req.body;

    const convertCase = (str: string) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    const response = await fetch(`https://www.npmjs.com/package/${convertCase(packageName)}`);
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const downloads = doc.querySelector('._9ba9a726')?.textContent;
    const allPackageDetails = {
        downloads: downloads,
        version: doc.querySelector('.abe380b3')?.textContent,
        unpackedSize: doc.querySelector('._702d723c')?.textContent,
        link: `https://www.npmjs.com/package/${convertCase(packageName)}`, 
        repoLink : doc.querySelector('._702d723c')?.textContent,
        commandToDownload: doc.querySelector('.d767adf4')?.textContent,
    }

    res.status(200).json({ ...allPackageDetails })

}

