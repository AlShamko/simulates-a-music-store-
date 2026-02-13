import React, {useState} from 'react';
import styled from 'styled-components';
import {ChevronDown, ChevronUp, Music, Heart} from 'lucide-react';
import * as Tone from 'tone';

interface SongTableProps {
    songs: any[];
}

const SongTable: React.FC<SongTableProps> = ({songs}) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const playMusic = async (audioData: any) => {
        if (!audioData || !audioData.notes) return;

        try {
            await Tone.start();
            const {notes, synthType} = audioData;
            const synth = new Tone.PolySynth(Tone.Synth, {
                oscillator: {type: synthType || 'sine'},
                envelope: {attack: 0.1, release: 1}
            }).toDestination();

            const reverb = new Tone.Reverb(2).toDestination();
            synth.connect(reverb);

            const now = Tone.now();
            notes.forEach((item: any) => {
                synth.triggerAttackRelease(item.note, item.duration, now + item.time);
            });
            setTimeout(() => {
                synth.dispose();
                reverb.dispose();
            }, 4000);

        } catch (error) {
            console.error("Audio error:", error);
        }
    };

    return (
        <TableContainer>
            <Table>
                <thead>
                <tr>
                    <Th>#</Th>
                    <Th>Song</Th>
                    <Th>Artist</Th>
                    <Th>Album</Th>
                    <Th>Genre</Th>
                    <Th><Heart size={14}/></Th>
                    <Th></Th>
                </tr>
                </thead>
                <tbody>
                {songs.map((song) => (
                    <React.Fragment key={song.id}>
                        <Row onClick={() => setExpandedId(expandedId === song.id ? null : song.id)}>
                            <Td>{song.id}</Td>
                            <Td style={{fontWeight: 600}}>{song.title}</Td>
                            <Td>{song.artist}</Td>
                            <Td>{song.album}</Td>
                            <Td>{song.genre}</Td>
                            <Td>{song.likes}</Td>
                            <Td>
                                {expandedId === song.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                            </Td>
                        </Row>
                        {expandedId === song.id && (
                            <tr>
                                <Td colSpan={7} style={{padding: 0}}>
                                    <ExpandedArea>
                                        <MiniCover src={song.coverUrl} alt={song.title}/>
                                        <div>
                                            <p style={{marginBottom: '0.5rem', fontSize: '0.8rem', color: '#666'}}>
                                                Preview: {song.audioData.scaleName || 'Custom Scale'} / {song.audioData.synthType}
                                            </p>
                                            <PlayBtn onClick={(e) => {
                                                e.stopPropagation();
                                                playMusic(song.audioData);
                                            }}>
                                                <Music size={16}/> Play
                                            </PlayBtn>
                                        </div>
                                    </ExpandedArea>
                                </Td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};


const TableContainer = styled.div`
    width: 100%;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`;

const Th = styled.th`
    background: #f9fafb;
    padding: 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    color: #374151;
    font-size: 0.875rem;
`;

const Row = styled.tr`
    cursor: pointer;

    &:hover {
        background-color: #f3f4f6;
    }
`;

const ExpandedArea = styled.div`
    padding: 1rem;
    background: #f8fafc;
    display: flex;
    gap: 2rem;
    align-items: center;
`;

const MiniCover = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PlayBtn = styled.button`
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: #1d4ed8;
    }
`;

export default SongTable;