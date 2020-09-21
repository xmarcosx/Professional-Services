/**
 * www.alcozer.dev developed script
 */
function getGroups() {

    var groupsArray = [];

    var optionalArgs = {
        customer: 'my_customer',
        maxResults: 200,
        orderBy: 'email',
        pageToken: null
    };

    while (optionalArgs['pageToken'] != 'done') {

        var response = AdminDirectory.Groups.list(optionalArgs);

        response.groups.forEach((group) => {
            var members = getGroupMembers(group.email);
            members.forEach((member) => {
                groupsArray.push([group.name, group.email, member]);
            });
        });

        if (response.nextPageToken) {
            optionalArgs['pageToken'] = response.nextPageToken;
        } else {
            optionalArgs['pageToken'] = 'done';
        }

    }


    bigQueryLoadData(groupsArray);

}

// groupKey is the groups email address
function getGroupMembers(groupKey) {

    var groupMembers = [];

    var optionalArgs = {
        maxResults: 200,
        pageToken: null
    };

    while (optionalArgs['pageToken'] != 'done') {

        var response = AdminDirectory.Members.list(groupKey, optionalArgs);
        response.members.forEach((member) => {

            if (member.status === 'ACTIVE') {
                groupMembers.push(member.email);
            }

        });

        if (response.nextPageToken) {
            optionalArgs['pageToken'] = response.nextPageToken;
        } else {
            optionalArgs['pageToken'] = 'done';
        }

    }

    return groupMembers;
}
