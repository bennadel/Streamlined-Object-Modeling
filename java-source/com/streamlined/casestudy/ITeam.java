package com.streamlined.casestudy;

import java.util.*;
import com.streamlined.util.exceptions.*;

public interface ITeam 
{
    // ACCESSING -- properties
    public String getDescription();
    public void setDescription(String newDescription) throws BusinessRuleException ;

    // ACCESSING -- property values
    public boolean isFormatNoChair();
    public boolean isFormatSingleChair();
    public boolean isFormatMultipleChair();
    
    public void setFormatNoChair() throws BusinessRuleException;
    public void setFormatSingleChair() throws BusinessRuleException;
    public void setFormatMutlipleChair() throws BusinessRuleException;

    // ACCESSING -- collaborations
    public List getTeamMembers(); 
    
    public void addTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;
    public void removeTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;

    public void doAddTeamMember(ITeamMember aTeamMember);
    public void doRemoveTeamMember(ITeamMember aTeamMember);

    // COLLABORATION RULES
    public void testAddTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;
    public void testCanBeChair(ITeamMember aTeamMember) throws BusinessRuleException;
 
    // DETERMINE MINE
    public List getChairs();
    public ITeamMember getTeamMember(IPersonProfile aPerson); 
}