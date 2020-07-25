import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamButton from '../TeamButton/TeamButton';

const TeamsButtonListPublic = (props) => {

  const GenCon = useContext(GeneralContext);

    const {
      publicTeams,
      page,
      handlePageDown,
      handlePageUp,
      currentClickedTeam,
    } = GenCon;

    const TeamList = publicTeams.map((team, i) => <TeamButton key={i} id={team.id} team_name={team.team_name}/>);

    return (
      <Fragment>
        <section className="folders-list">
          <div>
          {page.value > 1 ? 
            <div className='pagebutton'>
              <button onClick={() => {
                handlePageDown();
              }}>{`Go to Previous 10 Teams`} <i className="fas fa-arrow-circle-left"></i>
              </button>
              <button onClick={() => {
                handlePageUp();
              }}><i className="fas fa-arrow-circle-right"></i> {`Go to Next 10 Teams`} 
              </button>
            </div> 
            : 
            <div className='pagebutton'>
            <button onClick={() => {
              handlePageUp();
            }}><i className="fas fa-arrow-circle-right"></i> {`Go to Next 10 Teams`} 
            </button>
          </div>}
          <span>{`Current Teams: ${page.value * 10 - 9} - ${page.value * 10}`}</span>
            <h3>Teams:</h3>
            
          </div>
          <div>
            {(TeamList.length > 0) ? TeamList : <h3>None! Please Log In and Add More Teams!</h3>}
          </div>
          <div>
            <span>{`Current Team: ${currentClickedTeam.value}`}</span>
          </div>
        </section>
      </Fragment>
    );
};

export default TeamsButtonListPublic;
