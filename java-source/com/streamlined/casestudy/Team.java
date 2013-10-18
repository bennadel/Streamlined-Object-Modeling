package com.streamlined.casestudy;

import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

public class Team extends Object implements ITeam
{    
    // DEFINE
    private String description;
    private ArrayList teamMembers;
    private TeamFormat format;
                       
    private static class TeamFormat
    {
        private int code;
        private String format;
        
        TeamFormat(int formatCode, String formatString)
        {
            this.code = formatCode;
            this.format = formatString;
        }
        
        public String toString(){ return this.format; }
        public boolean equals(Object anObject)
        {
            if (anObject instanceof TeamFormat)
                return (this.code == ((TeamFormat)anObject).code);
            else return false;
        }
    }
    
    /**
      * Three role types. MULTIPLE is the default role.
      */
    private static TeamFormat FORMAT_NONE = new TeamFormat(2, "no chairs");
    private static TeamFormat FORMAT_SINGLE = new TeamFormat(1, "single chair");
    private static TeamFormat FORMAT_MULTIPLE = new TeamFormat(0, "multiple chairs");
    
    // INITIALIZE
    
    public Team() 
    {
        this.description = new String();
        this.teamMembers = new ArrayList();
        this.format = FORMAT_MULTIPLE;
    }

    // ACCESSORS --  properties

    public String getDescription()
    {
        return this.description;
    }
  
    // ACCESSING --  get property values
    
    public boolean isFormatNoChair()
    {
        return this.format.equals(FORMAT_NONE);
    }
    
    public boolean isFormatSingleChair()
    {
        return this.format.equals(FORMAT_SINGLE);
    }
  
    public boolean isFormatMultipleChair()
    {
        return this.format.equals(FORMAT_MULTIPLE);
    }

    // ACCESSING --  set properties
    
    public void setDescription(String newDescription) throws BusinessRuleException
    {
        this.description = newDescription;
    }
 
    // ACCESSING --  set property values
    
    public void setFormatNoChair() throws BusinessRuleException
    { 
        this.format = FORMAT_NONE;
    }
        
    public void setFormatSingleChair() throws BusinessRuleException
    { 
        this.format = FORMAT_SINGLE;
    }

    public void setFormatMutlipleChair() throws BusinessRuleException
    { 
        this.format = FORMAT_MULTIPLE;
    }
    
    // ACCESSING --  collaborators
    /**
      * Return team member enumerator. 
      */
    public List getTeamMembers() 
    {
        return Collections.unmodifiableList(this.teamMembers);
    }

    /**
      * Return team members list iterator. 
      * Allows subclasses to edit list
      */
    protected ListIterator getTeamMembersList() 
    {
        return this.teamMembers.listIterator();
    }
       
    /**
      * Add a team member. Fail if null or collaboration rules fail.
      */
    public void addTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (aTeamMember == null)
        {
            throw new BusinessRuleException("Tried to add null team member");
        }
        aTeamMember.addTeam(this);
    }
  
    /**
      * Add a team member. Fail if null or collaboration rules fail.
      */
    public void removeTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (aTeamMember == null)
        {
            throw new BusinessRuleException("Tried to remove null team member");
        }
        aTeamMember.removeTeam(this);
    }
    
    // ACCESSORS -- do adds

    /**
      * Add a new nomination. Mark nominations as needing resort.
      */
    public void doAddTeamMember(ITeamMember aTeamMember)
    {
        this.teamMembers.add(aTeamMember);
    }
    
    public void doRemoveTeamMember(ITeamMember aTeamMember)
    {
        this.teamMembers.remove(aTeamMember);
    }
    
    // PRINT
    
    public String toString()
    {
        StringBuffer buffy = new StringBuffer(30);
        buffy.append("Team : ");
        buffy.append("\nDescription: " + this.description);
        buffy.append("\nFormat: " + this.format);
        return buffy.toString();
    }

    // EQUALS
    
    public boolean equals(Object anObject)
    {
        if (anObject instanceof Team)
        {
            Team other = (Team)anObject;
            if (!this.description.equals(other.description)) return false;
            if (!this.format.equals(other.format)) return false;
            return true;
        }
        else return false;
    }
 
    
    // DETERMINE MINE
   public List getChairs()
   {
        CollectionSelector chairSelector = new CollectionSelector()
        {
            public boolean selectBlock(Object listElement, Object keyValue)
            {
                return ((ITeamMember)listElement).isRoleChair();
            }
        };
        return (List)chairSelector.select(this.teamMembers);
   }
    
    public ITeamMember getTeamMember(IPersonProfile aPerson)
    {
        CollectionDetector personDetector = new CollectionDetector()
        {
            public boolean detectBlock(Object listElement, Object keyValue)
            {
                return ((ITeamMember)listElement).getPerson().equals(keyValue);
            }
        };
        return (ITeamMember)personDetector.detect(this.teamMembers, aPerson);
    }
    
    
    // COLLABORATION RULES
    
    /**
      * Test if can collaborate with person. 
      * Fail if person does not have valid email.
      */
    public void testAddTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (aTeamMember.isRoleChair())
            this.testCanBeChair(aTeamMember);
    }

    // PROPERTY RULES

    public void testCanBeChair(ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (this.isFormatMultipleChair()){ return; }
        if (this.isFormatNoChair())
        {
            throw new BusinessRuleException("Tried to add chair team member to no chairs team.");
        }
        if (this.getChairs().size() > 0)
        {
            throw new BusinessRuleException("Tried to add another chair team member to single chair team.");
        }
    }
    
    // RUN
    
    public static Team testTeam() throws BusinessRuleException
    {
        Team aTeam = new Team();
        aTeam.setDescription("System Integration Team");
        return aTeam;
    }
  
    public static Team testNoChairTeam() throws BusinessRuleException
    {
        Team aTeam = new Team();
        aTeam.setFormatNoChair();
        aTeam.setDescription("Summer Picnic Planning Team");
        return aTeam;
    }
   
    public static Team testSingleChairTeam() throws BusinessRuleException
    {
        Team aTeam = new Team();
        aTeam.setFormatSingleChair();
        aTeam.setDescription("Executive Strategy Team");
        return aTeam;
    }
                    
}