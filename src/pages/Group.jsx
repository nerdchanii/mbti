import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout';

import { renderGraph } from '../utils/graph';
import ShareButton from '../components/ShareButton';
import { Button } from '@mui/material';

function Group() {
  const { groupId } = useParams();
  const [name, setName] = useState(undefined);
  useEffect(() => {
    (async () => {
      const response = await axios(`https://mbti-api.ttbkk.com/api/mbti/${groupId}`);
      const data = response.data;
      console.log(data);
      setName(data.group.name);
      renderGraph(data);
    })();
  }, []);

  const navigate = useNavigate()

  return (
    <Layout>
      <div id="mountNode" style={{ height: window.document.documentElement.clientWidth / 2 }}/>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => navigate(`/group/${groupId}/add`)} variant={'contained'} color={'info'}
                size={'large'}>내 MBTI 추가하기</Button>
        <ShareButton name={name}/>
      </div>
    </Layout>
  );
}

export default Group;
