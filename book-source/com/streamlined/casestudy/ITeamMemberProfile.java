package com.streamlined.casestudy;

import java.util.*;

public interface ITeamMemberProfile extends IPersonProfile
{
    // ACCESSORS -- get properties
    public SecurityLevel getSecurityLevel();

    // ACCESSORS -- get property values
    public boolean isRoleAdmin();
    public boolean isRoleChair();
    public boolean isRoleMember();

    // ACCESSORS -- get collaborators
    public ITeam getTeam();
    public IPerson getPerson();
    public List getNominations();
    
    // DETERMINE MINE    
    public int maxNominationsAllowed();
    public boolean hasNominatePrivilege();
    public boolean hasDeletePrivilege();

    // ANALYZE TRANSACTIONS
    public int countNominationsPerPeriod();
    public int countNominationsPerDays(int daysInPeriod);
}