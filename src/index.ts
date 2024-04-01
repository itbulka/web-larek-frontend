import './scss/styles.scss';
import {WebLarekApi} from "./components/WebLarekApi";
import {API_URL, CDN_URL} from "./utils/constants";

const api = new WebLarekApi(CDN_URL, API_URL);



api.getProducts()
    .then(items => console.log(items))
    .catch(err => console.log(err));
