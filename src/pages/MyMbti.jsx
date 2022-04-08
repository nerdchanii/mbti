import React, { useState, useCallback } from 'react';
import Layout from '../layout';
import ChooseCharacter from '../components/mbti/ChooseCharacter';
import Char from '../components/mbti/Char';
import './myMbti.scss';
import '../components/mbti/mbti.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, TextField } from '@mui/material';
import { env } from '../env';

function MyMbti() {
  const { groupId } = useParams();
  const [userName, setUserName] = useState(undefined);
  const [groupName, setGroupName] = useState(undefined);
  const [mbti, setMbti] = useState({
    IE: '?',
    SN: '?',
    TF: '?',
    JP: '?',
  });
  const navigate = useNavigate();

  const onclick = (e) => {
    setMbti({
      ...mbti,
      [e.target.name]: e.target.value,
    });
    console.log(mbti);
  };
  const onUserNameInput = (e) => {
    setUserName(e.target.value);
  };
  const onGroupNameInput = (e) => {
    setGroupName(e.target.value);
  };
  const makeGroup = useCallback(async () => {
    const data = {
      mbti: Object.values(mbti).join(''),
      name: userName,
      ...(groupId ? { groupId } : { groupName }),
    };
    const response = await axios.post(
      `${env.apiHost}/api/mbti`,
      data
    );
    if (response.status === 201) {
      const id = response.data.id;
      navigate(`/group/${id}`);
    } else {
      alert('error');
    }
  }, [mbti, userName, groupName]);

  return (
    <Layout>
      <div className="select-section">
        <ChooseCharacter
          name="IE"
          onClick={onclick}
          values={['I', 'E']}
        />
        <ChooseCharacter
          name="SN"
          onClick={onclick}
          values={['S', 'N']}
        />
        <ChooseCharacter
          name="TF"
          onClick={onclick}
          values={['T', 'F']}
        />
        <ChooseCharacter
          name="JP"
          onClick={onclick}
          values={['J', 'P']}
        />
      </div>
      <div>
        {!groupId && <div style={{ textAlign: 'center' }}>
          <TextField autoComplete={'off'} label={'그룹 이름'} onInput={onGroupNameInput} placeholder={'그룹 이름'} error={!groupId && !groupName}/>
        </div>}
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField autoComplete={'off'} label={'내 이름'} onInput={onUserNameInput} placeholder={'내 이름'} error={!userName}/>
          <Button onClick={makeGroup} variant={'contained'} color={'primary'} size={'large'}>궁합 보러가기</Button>
        </div>
      </div>
    </Layout>
  );
}

export default MyMbti;
