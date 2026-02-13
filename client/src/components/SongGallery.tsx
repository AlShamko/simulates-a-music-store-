import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from './SongCard.tsx';

interface GalleryProps {
    songs: any[];
    nextPage: () => void;
    hasMore: boolean;
}

const SongGallery: React.FC<GalleryProps> = ({songs, nextPage, hasMore}) => {
    return (
        <InfiniteScroll
            dataLength={songs.length}
            next={nextPage}
            hasMore={hasMore}
            loader={<Loader>Loading more awesome tracks...</Loader>}
            endMessage={<EndMessage>You've reached the end of the world (of music)!</EndMessage>}
        >
            <Grid>
                {songs.map((song, index) => (
                    <SongCard key={`${song.id}-${index}`} song={song}/>
                ))}
            </Grid>
        </InfiniteScroll>
    );
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
`;

const Loader = styled.div`
    text-align: center;
    padding: 1rem;
    font-weight: bold;
    color: #3b82f6;
`;

const EndMessage = styled.p`
    text-align: center;
    color: #6b7280;
    margin-top: 2rem;
    font-style: italic;
`;

export default SongGallery;