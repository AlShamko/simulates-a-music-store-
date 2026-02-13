import styled from 'styled-components';
import { RefreshCw, LayoutGrid, List } from 'lucide-react';

const Toolbar = ({ locale, setLocale, seed, setSeed, likes, setLikes, viewMode, setViewMode }: any) => {
    const generateRandomSeed = () => setSeed(Math.floor(Math.random() * 1000000).toString());

    return (
        <ToolbarContainer>
            <ControlGroup>
                <Label>Region</Label>
                <Select value={locale} onChange={(e) => setLocale(e.target.value)}>
                    <option value="en">USA</option>
                    <option value="ru">Russian</option>
                    <option value="zh">China</option>
                </Select>
            </ControlGroup>

            <ControlGroup $flexGrow>
                <Label>Seed</Label>
                <InputWrapper>
                    <TextInput
                        type="text"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                    />
                    <IconButton onClick={generateRandomSeed}>
                        <RefreshCw size={18} />
                    </IconButton>
                </InputWrapper>
            </ControlGroup>

            <ControlGroup>
                <Label>Avg Likes: {likes}</Label>
                <Slider
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={likes}
                    onChange={(e) => setLikes(parseFloat(e.target.value))}
                />
            </ControlGroup>

            <ViewToggle>
                <ToggleButton $active={viewMode === 'table'} onClick={() => setViewMode('table')}>
                    <List size={20} />
                </ToggleButton>
                <ToggleButton $active={viewMode === 'gallery'} onClick={() => setViewMode('gallery')}>
                    <LayoutGrid size={20} />
                </ToggleButton>
            </ViewToggle>
        </ToolbarContainer>
    );
};

const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ControlGroup = styled.div<{ $flexGrow?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: ${props => props.$flexGrow ? 1 : 0};
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const Select = styled.select`
  border: none;
  border-bottom: 2px solid #3b82f6;
  outline: none;
  padding: 0.25rem 0;
  background: transparent;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid #d1d5db;
  outline: none;
  padding: 0.25rem 0;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #3b82f6;
  }
`;

const IconButton = styled.button`
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #3b82f6;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Slider = styled.input`
  width: 12rem;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.5rem;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: #3b82f6;
    border-radius: 50%;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.25rem;
  gap: 0.25rem;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: ${props => props.$active ? 'white' : 'transparent'};
  box-shadow: ${props => props.$active ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'};
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.$active ? '#1f2937' : '#6b7280'};
  transition: all 0.2s;
`;

export default Toolbar;