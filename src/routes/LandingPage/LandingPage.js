import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';

export class LandingPage extends Component {
  static defaultProps = {
    location: {},
    history: {push: () => {}}
  };

  handleLoginSucess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  render() {
    return (
      <body>
        <main>
          <header role="banner">
            <h1>PokeTeams</h1>
            <h2>store. organize. edit. share.</h2>
          </header>
          <section>
            <header>
              <h3>Gotta Store 'em All!</h3>
            </header>
            <LoginForm onLoginSuccess={this.handleLoginSucess}/>
          </section>
          <section class="left">
            <header>
              <h3>Store your teams like never before!</h3>
            </header>
            <p>[placeholder for upload ui]</p>
            <p>PokeTeams goes above and beyond the average pastebin in order for you to save
            and organize your teams from Pokemon Showdown into a secure database.  Never lose a team again!
            </p>
          </section>
          <section>
            <header>
              <h3>Organize, Edit, and Share Your Teams!</h3>
            </header>
            <p>[placeholder for homescreen ui]</p>
            <p>Once you've uploaded your teams, organize, edit, and share them to
            your hearts content!  
            </p>
          </section>
          <section class="right">
            <header>
                <h3>Search By Numerous Parameters and Export!</h3>
            </header>
            <p>[placeholder for search and export option ui]</p>
            <p>PokeTeams lets you search the database by specific Pokemon species, alphabetical order,
              popularity, and newly created, Favorite ones you like, and export ones you
              want to use for your own Pokemon Showdown teams!
            </p>
          </section>
        </main>
      <Footer/>
    </body>
    );
  };
};

export default LandingPage;
