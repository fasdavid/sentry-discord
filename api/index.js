const fetch = require('node-fetch');

const COLORS = {
  debug: parseInt('fbe14f', 16),
  info: parseInt('2788ce', 16),
  warning: parseInt('f18500', 16),
  error: parseInt('e03e2f', 16),
  fatal: parseInt('d20f2a', 16),
};

module.exports = async (request, response) => {
  try {
    const { body } = request;

   var recived=Date.now();
    
    try{
      recived=new Date(body.event.received * 1000).toISOString();
    }
    catch(error){
          console.error(err);
    }
    
    const payload = {
      username: 'Error reporting',
      avatar_url: `https://cdn.discordapp.com/icons/803256473160646726/41e71e33f476ac7f9931f3ebb6badc48.png?size=128`,
      embeds: [
        {
          title: 'DSJCamp - web',
          type: 'rich',
          description: body.message,
          url: body.url,
          timestamp: recived,
          color: COLORS[body.level] || COLORS.error,
          footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/813048433886887966/77270f95cf2d8d600cca56cda880a024.webp?size=128',
            text: 'via Sentry.io',
          },
          fields: [],
        },
      ],
    };

    if (body.event.user) {
      payload.embeds[0].fields.push({
        name: '**User**',
        value: body.event.user.username,
      });
    }

    if (body.event.tags) {
      body.event.tags.forEach(([key, value]) => {
        payload.embeds[0].fields.push({
          name: key,
          value: value,
          inline: true,
        });
      });
    }
console.log(payload);
    fetch(process.env.WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
  }
};
