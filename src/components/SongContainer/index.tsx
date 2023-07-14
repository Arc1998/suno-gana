import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  setPlay,
  addToFavourite,
} from "../../reducers/songReducer";
import { StyledSongContainer, StyledImage, StyledTrackInfo, StyledTrackName, StyledArtistName, StyledHeartIcon, StyledMusicEmoji } from "../SongContainer/StyledSongContainer"
import { useNavigate } from "react-router-dom";

const SongContainer = (props: any) => {
  const {
    currentSong,
    songAction: { isPlaying },
    favSongs,
  } = useSelector((state: { song: any }) => state.song);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  const setSong = (song: any) => {
    if (currentSong?.previewUrl === song.previewUrl && isPlaying) {
      dispatch(setPlay({ isPlaying: false }));
    } else if (currentSong?.previewUrl === song.previewUrl && !isPlaying) {
      dispatch(setPlay({ isPlaying: true }));
    } else {
      dispatch(setCurrentSong({ currentSong: song }));
      dispatch(setPlay({ isPlaying: isPlaying ? isPlaying : !isPlaying }));
    }
  };

  return (
    <>
      {props.songs?.length ? (
        props.songs.map((song: any, index: number) => (
          <StyledSongContainer key={index} onClick={() => { setSong(song) }}>
            <StyledImage src={song?.artworkUrl100} alt="pic" />
            <StyledTrackInfo>
              <StyledTrackName>
                {song?.trackCensoredName}
              </StyledTrackName>
              <StyledArtistName>
                {song?.artistName?.slice(0, 10)}
              </StyledArtistName>
            </StyledTrackInfo>
            {currentSong?.previewUrl === song.previewUrl && isPlaying ? (
              <StyledMusicEmoji role="img" aria-label="music-emoji">
                🎵
              </StyledMusicEmoji>
            ) : null}
            <StyledHeartIcon
              onClick={() => {
                !user.isLoggedIn
                  ? navigate("/login")
                  : dispatch(addToFavourite({ favSong: currentSong }));
                console.log(favSongs);
              }}
            />
          </StyledSongContainer>
        ))
      ) : (
        <p>LOADING</p>
      )}
    </>
  );
};

export default SongContainer;
