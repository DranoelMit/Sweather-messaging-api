const express = require('express');
const router = express.Router();

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const phone_from = process.env.TWILIO_NUM;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

router.post('/', async (req, res) => {
  
  //each contact object either has an email or number attribute, but not both and never neither

  const { contacts, info, author } = req.body;
  contacts.map( contact => {
    if(typeof contact.number !== 'undefined'){ //phone #
        client.messages.create({
            body: `${author} has sent you an emergency flood warning`,
            from: phone_from,
            to: contact.number
        }).then(message => res.status(200).json({msg_sid: message.sid}))
        .catch( error => res.status(500).json({error: 'something goofed'}));
    }
    else { //email
      const msg = {
        to: contact.email,
        from: { email: 'no-reply@sweather.xyz', name: 'Emergency Alert'},
        subject: 'Sweather emergency flood warning',
        text: 'FLOOD WARNING',
        html: `<strong>${author} has sent you an emergency flood warning</strong>`,
      };
      const sent = sgMail.send(msg).catch(error => { 
        console.log(error, error.response.body.errors);
        res.status(500).send();
      });
      res.status(200).send();
    }
  }); 
});
module.exports = router;
