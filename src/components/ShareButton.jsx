import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { getCurrentUrl } from '../utils/browser';

function ShareButton(props) {
  const [open, setOpen] = React.useState(false);
  const currentUrl = getCurrentUrl();

  let title = window.document.title;
  if (props?.name) {
    title = `[${name}] ` + title;
  }
  const onClick = () => {
    try {
      window.navigator.share({
        url: "",
        title,
      });
    } catch (e) {
      const element = document.createElement('input');
      element.value = currentUrl;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
      setOpen(true);
    }
  };

  return <Button id='share' onClick={onClick} size={'large'} color={'primary'} variant={'contained'}>
    <Snackbar
      message={'주소가 클립보드에 복사되었습니다!'}
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => setOpen(false)}
      autoHideDuration={1000}
    />
    지인들에게 공유하기
  </Button>;
}

export default ShareButton;
