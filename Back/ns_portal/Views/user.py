

from pyramid.security import NO_PERMISSION_REQUIRED
from pyramid.view import view_config
from sqlalchemy import select
from ..Models import DBSession, User, dbConfig
@view_config(
    route_name='core/user',
    permission=NO_PERMISSION_REQUIRED,
    renderer='json'
)
def users(request):
    """Return the list of all the users with their ids.
    """
    query = select([
        User.id.label('PK_id'),
        User.Login.label('fullname')
    ]).where(User.HasAccess == True).order_by(User.Lastname, User.Firstname)
    print(request)

    

    return [dict(row) for row in DBSession.execute(query).fetchall()]
    
@view_config(
    route_name='core/currentUser',
    renderer='json'
)
def current_user(request):
    """Return the list of all the users with their ids.
    """
    query = select([
        User.id.label('PK_id'),
        User.Login.label('fullname'),
        User.Firstname.label('firstname'),
        User.Lastname.label('lastname'),
        User.Language.label('language')
    ]).where(User.id == request.authenticated_userid['iss'])

    toret = dict(DBSession.execute(query).fetchone())
    toret['site'] = dbConfig['siteName']

    print ("********************************************")

    return toret
