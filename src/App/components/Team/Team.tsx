import React, { useContext, useState, FunctionComponent } from 'react';
import { PokemonTeam, PokemonSet } from '../../@types';
import GeneralContext from '../../contexts/GeneralContext';
import Button from '../Button';
import PokemonSetForm from '../PokemonSetForm';
import ExpandedTeam from './ExpandedTeam';
import styles from './Team.module.scss';
import UnexpandedTeam from './UnexpandedTeam';

export type TeamProps = {
  /** pokemon team */
  team: PokemonTeam;
  /** id as a team name */
  id: string;
  /** determines whether team is public or private */
  isPublic: boolean;
  /** pokemon sets, passed in usually from share page */
  /** @todo: find a way to eithe make this how its done, or remove */
  passedTeamSets?: PokemonSet[];
};

const Team: FunctionComponent<TeamProps> = ({
  team,
  id,
  isPublic,
  passedTeamSets,
}): JSX.Element => {
  const { userSets, publicSets, handleCreateDefaultPokemon, handleDeleteTeam } =
    useContext(GeneralContext);

  const [teamName, setTeamName] = useState({
    value: team.team_name || '',
    touched: false,
  });
  // const [favoriteTeam, setFavoriteTeam] = useState({ value: false, touched: false });
  // TOOD: add this as a real feature
  const [description, setDescription] = useState({
    value: team.description || '',
    touched: false,
  });
  const [teamExpandToggle, setTeamExpandToggle] = useState(true);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const inputTeamName = (teamName: string) => {
    setTeamName({ value: teamName, touched: true });
  };

  // const setFavTeam = favoriteTeam => {
  //   setFavoriteTeam({value: favoriteTeam, touched: true});
  // };

  const setDesc = (description: string) => {
    setDescription({ value: description, touched: true });
  };

  const handleTeamToggle = () => {
    setTeamExpandToggle(!teamExpandToggle);
    setTeamName({ value: team.team_name || '', touched: false });
    setDescription({ value: team.description || '', touched: false });
  };

  const handleDeleteExpand = () => {
    setDeleteClicked(!deleteClicked);
  };

  /* ---------------- */

  /* Set Up Common Definitions to be 
  Used in Expanded/Unexpanded views */

  const pokemonSets = passedTeamSets
    ? passedTeamSets
    : isPublic
    ? publicSets
    : userSets;

  const pokemonSetsList = [
    ...new Set(pokemonSets.map((set: PokemonSet) => set.id)),
  ].map(
    (id) =>
      pokemonSets.find((set: PokemonSet) => set.id === id) || ({} as PokemonSet)
  );

  const teamSets = pokemonSetsList.filter(
    (set: PokemonSet) => set.team_id === team.id
  );

  const renderSetList = (teamSets: PokemonSet[]) => {
    const SetList = teamSets.map((set: PokemonSet) => {
      return <PokemonSetForm key={set.id} set={set} isPublic={isPublic} />;
    });

    if (SetList.length < 6 && !isPublic) {
      SetList.push(
        <Button
          buttonClass={styles['add-pokemon-button']}
          key={SetList.length}
          onClickCallback={(e) => {
            e.preventDefault();
            !!team.id && handleCreateDefaultPokemon(team.id);
            // we just need the id of the team.  this func fills out default vals.
          }}
        >
          Add Pokemon! +
        </Button>
      );
    }
    return SetList;
  };

  return (
    <>
      {teamExpandToggle ? (
        <UnexpandedTeam
          team={team}
          teamSets={teamSets}
          id={id}
          handleTeamToggle={handleTeamToggle}
        />
      ) : (
        <ExpandedTeam
          isPublic={isPublic}
          setList={renderSetList(teamSets)}
          teamSets={teamSets}
          id={id}
          handleTeamToggle={handleTeamToggle}
          team={team}
          teamName={teamName}
          inputTeamName={inputTeamName}
          description={description}
          setDesc={setDesc}
          handleDeleteTeam={handleDeleteTeam}
          deleteClicked={deleteClicked}
          handleDeleteExpand={handleDeleteExpand}
        />
      )}
    </>
  );
};

export default Team;
