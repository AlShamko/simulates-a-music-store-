import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Toolbar from './components/Toolbar';
import SongTable from './components/SongTable';
import SongGallery from './components/SongGallery';

const App = () => {
    const [locale, setLocale] = useState('en');
    const [seed, setSeed] = useState('42');
    const [likes, setLikes] = useState(5.0);
    const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');

    const [songs, setSongs] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchSongs = useCallback(async (pageNum: number, isNew: boolean) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/songs`, {
                params: {seed, page: pageNum, locale, likes}
            });

            const newSongs = response.data;

            if (newSongs.length < 20) setHasMore(false);
            else setHasMore(true);

            if (isNew) {
                setSongs(newSongs);
            } else {
                setSongs(prev => [...prev, ...newSongs]);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false);
        }
    }, [seed, locale, likes]);

    useEffect(() => {
        setPage(1);
        fetchSongs(1, true);
    }, [seed, locale, likes, fetchSongs]);

    const handlePageChange = (direction: 'next' | 'prev') => {
        const nextP = direction === 'next' ? page + 1 : page - 1;
        setPage(nextP);
        fetchSongs(nextP, true);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <AppContainer>
            <Toolbar
                locale={locale} setLocale={setLocale}
                seed={seed} setSeed={setSeed}
                likes={likes} setLikes={setLikes}
                viewMode={viewMode} setViewMode={setViewMode}
            />

            <MainContent>
                {viewMode === 'table' ? (
                    <>
                        <SongTable songs={songs}/>
                        <PaginationWrapper>
                            <PageButton
                                disabled={page === 1 || loading}
                                onClick={() => handlePageChange('prev')}
                            >
                                Previous
                            </PageButton>
                            <PageIndicator>Page {page}</PageIndicator>
                            <PageButton
                                disabled={!hasMore || loading}
                                onClick={() => handlePageChange('next')}
                            >
                                Next
                            </PageButton>
                        </PaginationWrapper>
                    </>
                ) : (
                    <SongGallery
                        songs={songs}
                        hasMore={hasMore}
                        nextPage={() => {
                            const next = page + 1;
                            setPage(next);
                            fetchSongs(next, false);
                        }}
                    />
                )}
            </MainContent>
        </AppContainer>
    );
};

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #f3f4f6; /* gray-100 */
    padding: 1.5rem;
    font-family: 'Inter', sans-serif;
`;

const MainContent = styled.main`
    margin-top: 1.5rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding-bottom: 2rem;
`;

const PageButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #f9fafb;
        border-color: #3b82f6;
        color: #3b82f6;
    }
`;

const PageIndicator = styled.span`
    font-weight: 700;
    color: #374151;
`;


export default App;