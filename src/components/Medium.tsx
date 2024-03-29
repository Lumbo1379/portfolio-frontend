import {
    ReactElement,
    useState,
    useEffect,
} from 'react';

import Collage from './Collage';
import { IImage } from './Image';

import httpService from '../services/httpService';
import logger from '../services/logService';

const getMediumData = async (): Promise<IImage[]> => {
    const feed = await httpService.get('/medium');

    return feed.data;
};

const Medium = (): ReactElement | null => {
    const [mediumData, setMediumData] = useState<IImage[]>([]);

    useEffect(() => {
        const loadMediumData = async (): Promise<void> => {
            setMediumData(await getMediumData());
        };

        loadMediumData();
    }, []);

    if (!mediumData || mediumData.length === 0) return null;

    if (mediumData.length !== 4) {
        logger.error(new Error('Exactly three articles and one profile picture are required'));
    }

    return (
        <div data-testid="medium">
            <Collage
                images={mediumData}
                layout={[
                    [0, 1],
                    [2, 3],
                ]}
            />
        </div>
    );
};

export default Medium;
