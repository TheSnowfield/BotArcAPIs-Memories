// filename : /v1/_debug_clearfriends.js
// author   : CirnoBakaBOT
// date     : 02/14/2020
// comment  : delete all friends (debug only)

import Utils from 'Utils';
import ArcApiUserMe from './_arcapi_userme';
import ArcApiFriendClear from './_arcapi_friend_clear';

export default async function (argument) {

    // initialize response data
    let _response_status = 200;
    let _response_data_template = {
        'clear_count': null,
        'friend_list': null
    };

    // check for arguments
    if (typeof argument.username != 'undefined') {

        // get account by username from KV database
        const _arc_account_data = await KVARCACCOUNT.get(argument.username);
        const _arc_account = JSON.parse(_arc_account_data);

        // query origin arcapi
        const _arc_account_info = await ArcApiUserMe(_arc_account);
        console.log(_arc_account, _arc_account_info);

        // check data valid
        if (_arc_account_info) {

            // fill the template
            _response_data_template.clear_count = _arc_account_info.friends.length;
            _response_data_template.friend_list = _arc_account_info.friends;

            // clear friend
            await ArcApiFriendClear(_arc_account, _arc_account_info.friends);

        } else _response_status = 502;

    } else _response_status = 400;

    // return data
    return Utils.MakeApiObject(_response_status, _response_data_template);
}