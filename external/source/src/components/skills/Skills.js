import React from 'react';
import { connect } from 'react-redux';

// Help service
import { getAllSkillsApi, addNewSkillApi } from './../../shared/ApiService';

// Icons
import FaPlus from 'react-icons/lib/fa/plus-circle';

class Skills extends React.Component {
  state = {
    skills: [],
    newSkillText: ''
  };

  componentDidMount() {
    getAllSkillsApi(this.props.token).then(resp => {
      this.setState({ skills: resp });
    });
  }

  changeNewSkillText = e => {
    this.setState({ newSkillText: e.target.value });
  };

  addNewSkill = index => {
    let skills = this.state.skills;
    skills.forEach(s => {
      s.showInput = false;
    });
    skills[index].showInput = true;
    this.setState({ skills, newSkillText: '' });
  };

  addNewSkillHandler = index => {
    let { token } = this.props;
    let parentId = this.state.skills[index].id;

    addNewSkillApi(token, parentId, this.state.newSkillText, '').then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        getAllSkillsApi(token).then(resp => {
          this.setState({ skills: resp });
        });
      }
    });
  };

  render() {
    const allSkills = this.state.skills.map((s, index) =>
      <div key={index} className="skills-wrapper">
        <span className="skills__parent">
          {s.name}
        </span>

        {s.children.map((c, index) =>
          <p key={index} className="skills__children">
            - {c.name}
          </p>
        )}

        {!s.showInput
          ? <button
              onClick={() => {
                this.addNewSkill(index);
              }}
              className="skills__add"
            >
              <span>+ add new skill</span>
            </button>
          : null}

        {s.showInput
          ? <div>
              <input
                type="text"
                value={this.state.newSkillText}
                onChange={this.changeNewSkillText}
                className="skillsadd__input"
              />
              <FaPlus
                className="skillsadd__btn"
                onClick={() => {
                  this.addNewSkillHandler(index);
                }}
              />
            </div>
          : null}
      </div>
    );

    return (
      <div
        className="container skills-container"
        style={{ background: this.props.bgColor }}
      >
        <div className="skills">
          {allSkills}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.generalReducer.token
  };
}

export default connect(mapStateToProps, {})(Skills);
