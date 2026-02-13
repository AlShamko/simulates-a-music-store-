import React from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';
import { Play } from 'lucide-react';
import { API_BASE_URL } from '../config/config';

interface SongProps {
    song: {
        id: number;
        title: string;
        artist: string;
        coverUrl: string;
        audioData: {
            notes: Array<{
                note: string;
                duration: string;
                time: number;
            }>;
            synthType: string;
        };
        likes: number;
        genre: string;
    };
}

const SongCard: React.FC<SongProps> = ({ song }) => {
    const correctedCoverUrl = song.coverUrl.includes('localhost:3000')
        ? song.coverUrl.replace('http://localhost:3000/api', API_BASE_URL)
        : song.coverUrl.startsWith('http')
            ? song.coverUrl
            : `${API_BASE_URL}${song.coverUrl}`;

    const playMusic = async () => {
        try {
            await Tone.start();
            const { notes, synthType } = song.audioData;

            const synth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: (synthType as any) || 'sine' },
                envelope: { attack: 0.1, release: 1 }
            }).toDestination();

            const feedbackDelay = new Tone.FeedbackDelay("8n", 0.4).toDestination();
            synth.connect(feedbackDelay);

            const now = Tone.now();
            notes.forEach((item) => {
                synth.triggerAttackRelease(item.note, item.duration, now + item.time);
            });

            setTimeout(() => {
                synth.dispose();
                feedbackDelay.dispose();
            }, 4000);

        } catch (e) {
            console.error("Audio error:", e);
        }
    };

    return (
        <Card>
            <CoverImage src={correctedCoverUrl} alt={song.title} loading="lazy" />
            <Content>
                <Header>
                    <Title title={song.title}>{song.title}</Title>
                    <Likes>❤️ {song.likes}</Likes>
                </Header>
                <Artist>{song.artist}</Artist>
                <Footer>
                    <GenreBadge>{song.genre}</GenreBadge>
                    <PlayButton onClick={playMusic}>
                        <Play size={16} /> Play
                    </PlayButton>
                </Footer>
            </Content>
        </Card>
    );
};

const Card = styled.div`
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #f3f4f6;
    transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
`;

const CoverImage = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1; /* Сохраняем квадратность для обложек */
    object-fit: cover;
`;

const Content = styled.div`
    padding: 1rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.25rem;
`;

const Title = styled.h3`
    font-weight: 700;
    font-size: 1.125rem;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 75%;
`;

const Likes = styled.span`
    color: #ef4444;
    font-weight: 600;
`;

const Artist = styled.p`
    color: #4b5563;
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
`;

const GenreBadge = styled.span`
    font-size: 0.75rem;
    background: #f3f4f6;
    color: #6b7280;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const PlayButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #1d4ed8;
    }
    svg {
        fill: currentColor;
    }
`;

export default SongCard;
