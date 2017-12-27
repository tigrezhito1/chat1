const request = require('request');
let functions = require('firebase-functions');
let admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');
const firebaseConfig = functions.config().firebase;

firebaseConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(firebaseConfig);

//used for facebook accountkit login with Firebase Custom Auth
exports.getCustomToken = functions.https.onRequest((req, res) => {
    const accessToken = req.query.access_token || '';
	const facebookAppSecret = functions.config().facebook.app_secret;
	
    request({
        url: `https://graph.accountkit.com/v1.1/me/?access_token=${accessToken}`,
        json: true
    }, (error, fbResponse, data) => {
        if (error) {
            console.error('Access token validation request failed\n', error);
            res.status(400).send(error);
        } else if (data.error) {
            console.error('Invalid access token\n', 
                `access_token=${accessToken}\n`, 
                `appsecret_proof=${appSecretProof}\n`, 
                data.error);
            res.status(400).send(data);
        } else {
            admin.auth().createCustomToken(data.id)
                .then(customToken => res.status(200).send(customToken))
                .catch(error => {
                    console.error('Creating custom token failed:', error);
                    res.status(400).send(error);
                })
        }
    });
});


exports.newRequest = functions.database.ref('/requests/{userId}/friendRequests/').onWrite(event => {
	sendMessage(event.params.userId,'New Friend Request','Someone wants to be your friend');
});

exports.newGroupCreation = functions.database.ref('accounts/{userId}/groups/').onWrite( event => {
	sendMessage(event.params.userId,'Joined New Group','Some added you to new group');
});

exports.friendRequestAccepted = functions.database.ref('accounts/{userId}/friends/').onWrite( event => {
	sendMessage(event.params.userId,'Friend Request Accepeted','You got new friend');
});

exports.newGroupMessage = functions.database.ref('accounts/{userId}/groups/{groupMessage}').onUpdate( event => {
	sendMessage(event.params.userId,'New Group Message','You got new group message');
});

exports.newMessage = functions.database.ref('accounts/{userId}/conversations/{conversationId}').onUpdate( event => {
	sendMessage(event.params.userId,'You got new message','Someone sent you message');
});

function sendMessage(uid, title, message){
	admin.database().ref('accounts/'+uid).once('value', snap =>{
		var token = snap.val().pushToken;
		console.log(token);
		if(token == undefined || token == '' || token == null){
			return true;
		}
		else{
			return admin.messaging().sendToDevice([token], {
				notification: {
					title: title,
					body: message,
					sound: 'default'
				}
			});
		};
	});
}