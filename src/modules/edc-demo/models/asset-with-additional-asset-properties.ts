import {Asset} from './asset';

export interface AssetWithAdditionalAssetProperties extends Asset {
  [s: string]: string | any;
}
