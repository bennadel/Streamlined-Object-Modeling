package com.streamlined.casestudy;

import java.util.*;
import com.streamlined.util.exceptions.*;

public interface IPerson extends IPersonProfile
{
    // ACCESSORS -- set properties
    public void setName(String newName) throws BusinessRuleException;
    public void setEmail(String newEmail) throws BusinessRuleException;
    public void setTitle(String newTitle) throws BusinessRuleException;
    
      // ACCESSORS -- get collaborators
    public List getTeamMembers();
    public ITeamMember getTeamMember(ITeam aTeam);
    
    // ACCESSORS -- add collaborators
    public void addTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;
    public void removeTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;

    // ACCESSORS -- do add collaborators
    public void doAddTeamMember(ITeamMember aTeamMember);
    public void doRemoveTeamMember(ITeamMember aTeamMember);
     
}
