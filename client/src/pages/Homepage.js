import React from 'react'
import {Box,Typography,Card,Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import FormatAlignLeftOutlined from '@mui/icons-material/FormatAlignLeftOutlined';
import ChatRounded from '@mui/icons-material/ChatRounded';
import ImageRounded from '@mui/icons-material/ImageRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Box sx={{display:'flex' ,flexWrap: 'wrap', flexDirection:'row', justifyContent:'space-evenly',overflowY: 'auto',minHeight: '100vh',}}>

        {/*Summarize Text */}
        <Box p={2}>
          <Typography variant='h4' mb={2} fontWeight="bold">
            Summarize Text
          </Typography>
          <Card onClick={()=>navigate('/summary')}
            sx= {{boxShadow: 2, borderRadius: 5,height: 190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"},'@media (max-width:600px)': {
            width: '300px', // Cards will take full width on small screens
            height: 'auto', // Let the height adjust automatically on small screens
            }}}
            >
              <DescriptionRounded sx={{fontSize:80,color:'primary.main', mt:2 , ml:2}}/>
              <Stack p={3} pt={0}>
                  <Typography fontWeight="bold" variant='h5'>
                      TEXT SUMMARY
                  </Typography>
                  <Typography fontWeight="bold" variant='h6'>
                      Summarize long Text into short sentences
                  </Typography>
              </Stack>
          </Card>
        </Box>


        {/*Text-Generation */}

        <Box p={2}>
            <Typography variant='h4' mb={2} fontWeight="bold">
              Text-Generation
            </Typography>
            <Card onClick={()=>navigate('/text-generation')}
              sx= {{boxShadow: 2, borderRadius: 5,height: 190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"},'@media (max-width:600px)': {
              width: '300px', // Cards will take full width on small screens
              height: 'auto', // Let the height adjust automatically on small screens
              }}}
              >
                <FormatAlignLeftOutlined sx={{fontSize:80,color:'primary.main', mt:2 , ml:2}}/>
                <Stack p={3} pt={0}>
                    <Typography fontWeight="bold" variant='h5'>
                        Generated Text
                    </Typography>
                    <Typography fontWeight="bold" variant='h6'>
                        Generate text using words
                    </Typography>
                </Stack>
            </Card>
          </Box>


          {/* chatbot */}
          <Box p={2}>
            <Typography variant='h4' mb={2} fontWeight="bold">
              AI ChatBot
            </Typography>
            <Card onClick={()=>navigate('/chatbot')}
              sx= {{boxShadow: 2, borderRadius: 5,height: 190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"},'@media (max-width:600px)': {
              width: '300px', // Cards will take full width on small screens
              height: 'auto', // Let the height adjust automatically on small screens
              }}}
              >
                <ChatRounded sx={{fontSize:80,color:'primary.main', mt:2 , ml:2}}/>
                <Stack p={3} pt={0}>
                    <Typography fontWeight="bold" variant='h5'>
                        Chatbot
                    </Typography>
                    <Typography fontWeight="bold" variant='h6'>
                        Chat with AI Chatbot
                    </Typography>
                </Stack>
            </Card>
          </Box>

          {/* JavaScript converter*/}
          <Box p={2}>
            <Typography variant='h4' mb={2} fontWeight="bold">
              JavaScript Converter
            </Typography>
            <Card onClick={()=>navigate('/js-converter')}
              sx= {{boxShadow: 2, borderRadius: 5,height: 190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"},'@media (max-width:600px)': {
              width: '300px', // Cards will take full width on small screens
              height: 'auto', // Let the height adjust automatically on small screens
              }}}
              >
                <CodeRounded sx={{fontSize:80,color:'primary.main', mt:2 , ml:2}}/>
                <Stack p={3} pt={0}>
                    <Typography fontWeight="bold" variant='h5'>
                        JS CONVERTER
                    </Typography>
                    <Typography fontWeight="bold" variant='h6'>
                        Convert English to JavaScript Code
                    </Typography>
                </Stack>
            </Card>
          </Box>

          {/* Sci-fiction Image */}
          <Box p={2}>
            <Typography variant='h4' mb={2} fontWeight="bold">
              AI SCIFI Images
            </Typography>
            <Card onClick={()=>navigate('/scifi-image')}
              sx= {{boxShadow: 2, borderRadius: 5,height: 190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.dark", cursor:"pointer"},'@media (max-width:600px)': {
              width: '300px', // Cards will take full width on small screens
              height: 'auto', // Let the height adjust automatically on small screens
              }}}
              >
                <ImageRounded sx={{fontSize:80,color:'primary.main', mt:2 , ml:2}}/>
                <Stack p={3} pt={0}>
                    <Typography fontWeight="bold" variant='h5'>
                        SCIFI Image
                    </Typography>
                    <Typography fontWeight="bold" variant='h6'>
                      Generate text to Image
                    </Typography>
                </Stack>
            </Card>
          </Box>

    </Box>
    </>
  )
}

export default Homepage
