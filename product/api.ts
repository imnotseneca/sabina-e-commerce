import axios from 'axios';

import Papa from 'papaparse';

import {Product} from "./types";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: async (): Promise<Product[]> => {
        return axios.get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vSGa5UfAxjUQWbK0mseOsddTd3j3DLu8vhkcUAtNYuJ6VYq5-It_sDwouu1qjjaxPPUIMkvEcCBOgYW/pub?output=csv`, 
            {
                 responseType: 'blob'
            }
            )
            .then( 
                (response) => 
                 new Promise<Product[]> ((res,rej) => {
                    Papa.parse(response.data, {
                     header: true,
                     complete: results => {
                        const products = results.data as Product[];

                        return res(
                            products.map((product) => ({
                            ...product,
                            price: Number(product.price),
                        })),
                        );
                     },
                     error: (error) => rej(error.message)
            });
        }),
    )}
};
