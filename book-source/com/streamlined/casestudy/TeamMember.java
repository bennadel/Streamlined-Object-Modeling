package com.streamlined.casestudy;

import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

public class TeamMember extends Object implements ITeamMember
{    
    // DEFINE
    private IPerson person;
    private ITeam team;
    private TeamRole role;
    private byte privileges;
    private ArrayList nominations;
    private SecurityLevel securityLevel;
    
    /**
      * Little static inner class, beause Java lacks key-value pair utility class.
      * Associates a string to a numeric code. 
      * Use string for nice display.
      * Use numeric code for quick comparisions.
      */
    private static class TeamRole
    {
        private int code;
        private String role;
        
        TeamRole(int roleCode, String roleString)
        {
            this.code = roleCode;
            this.role = roleString;
        }
        
        public int getCode( ) { return this.code; }
        public String toString(){ return this.role; }
        public boolean equals(Object anObject)
        {
            if (anObject instanceof TeamRole)
                return (this.code == ((TeamRole)anObject).getCode());
            else return false;
        }
    }
    
    /**
      * Three role types. MEMBER is the default role.
      */
    private static TeamRole ROLE_ADMIN = new TeamRole(0, "admin");
    private static TeamRole ROLE_CHAIR = new TeamRole(1, "chair");
    private static TeamRole ROLE_MEMBER = new TeamRole(2, "member");

    /**
      * Masks for checking privileges.
      */
    private static byte PRIVILEGES_DEFAULT_MASK = 0;
    private static byte PRIVILEGES_DELETE_MASK = 1;    
    private static byte PRIVILEGES_NOMINATE_MASK = 2;
    
    /**
      * Number of documents can nominate per nomination time period.
      */
    private static int MAX_DOCUMENTS = 5;
    private static int MAX_CHAIR_DOCUMENTS = 10;    
    
    /**
      * Number of days in nomination time period.
      */
    private static int NOMINATIONS_TIME_PERIOD = 30;

    // INITIALIZE
    
    /**
      * Create a team member for a person and a team.
      * Fail if collaboration rules not met.
      */
    public TeamMember(IPerson aPerson, ITeam aTeam) throws BusinessRuleException
    {
        this.makeMember();
        this.securityLevel = new SecurityLevel();
        this.nominations = new ArrayList();
        this.addPerson(aPerson);
        try
        {
            this.addTeam(aTeam);
        }
        catch(BusinessRuleException aBizRuleException)
        {
            aPerson.removeTeamMember(this);
            throw aBizRuleException;
        }
    }

    // ACCESSORS -- get properties

    public SecurityLevel getSecurityLevel()
    {
        return this.securityLevel;
    }
    
    /**
      * IPersonProfile service.
      * Name property object inherited from Person
      */
    public String getName()
    {
        return this.person.getName();
    }
    
    /**
      * IPersonProfile service.
      * Title property object inherited from Person
      */
    public String getTitle()
    {
        return this.person.getTitle();
    }
    
    /**
      * IPersonProfile service.
      * Email property object inherited from Person
      */
    public String getEmail()
    {
        return this.person.getEmail();
    }
        
    // ACCESSORS -- get property value

    public boolean isRoleAdmin()
    { 
        return this.role.equals(ROLE_ADMIN);
    }

    public boolean isRoleChair()
    { 
        return this.role.equals(ROLE_CHAIR);
    }

    public boolean isRoleMember()
    { 
        return this.role.equals(ROLE_MEMBER);
    }
        
    // ACCESSORS -- set property value
    
    public void doSetRoleAdmin() throws BusinessRuleException
    { 
        this.doSetRole(ROLE_ADMIN);
    }

    public void doSetRoleChair() throws BusinessRuleException
    { 
        this.testSetRoleChair();
        this.doSetRole(ROLE_CHAIR);
    }

    public void doSetRoleMember() throws BusinessRuleException
    { 
        this.doSetRole(ROLE_MEMBER);
    }
        
 
    // ACCESSORS -- get collaborators
    
    /**
      * Return nominations enumerator.  
      */
    public List getNominations() 
    {
        return Collections.unmodifiableList(this.nominations);
    }

    public IPerson getPerson()
    {
        return this.person;
    }    

    public ITeam getTeam()
    {
        return this.team;
    }
    
    /**
      * Return nominations list iterator. 
      * Allows subclasses to edit list
      */
    protected ListIterator getNominationsList() 
    {
        return this.nominations.listIterator();
    }
    
    // ACCESSORS -- add collaborators
   
    /**
      * Add a person. Fail if null or collaboration rules fail.
      */
    public void addPerson(IPerson aPerson) throws BusinessRuleException
    {
        if (aPerson == null)
        {
            throw new BusinessRuleException("Tried to add null person");
        }
        this.testAddPerson(aPerson);
        this.doAddPerson(aPerson);
        aPerson.doAddTeamMember(this);
    }
    
    public void removePerson(IPerson aPerson) throws BusinessRuleException
    {
        if (aPerson == null)
        {
            throw new BusinessRuleException("Tried to remove null person");
        }
        this.testRemovePerson(aPerson);
        this.doRemovePerson(aPerson);
        aPerson.doRemoveTeamMember(this);
    }
    
    public void addTeam(ITeam aTeam) throws BusinessRuleException
    {
        if (aTeam == null)
        {
            throw new BusinessRuleException("Tried to add null team.");
        }
        this.testAddTeam(aTeam);
        aTeam.testAddTeamMember(this);
        this.doAddTeam(aTeam);
        aTeam.doAddTeamMember(this);
    }
    
    public void removeTeam(ITeam aTeam) throws BusinessRuleException
    {
        if (aTeam == null)
        {
            throw new BusinessRuleException("Tried to remove null team.");
        }
        this.testRemoveTeam(aTeam);
        this.doRemoveTeam(aTeam);
        aTeam.doRemoveTeamMember(this);
    }
    
    // ACCESSORS -- do sets

    /**
      * Sets the role property. 
      */
    public void doSetRole(TeamRole aTeamRole)
    {
        this.role = aTeamRole;
    }
 
    // ACCESSORS -- do adds

    /**
      * Add a new nomination. 
      */
    public void doAddNomination(INomination aNomination)
    {
        this.nominations.add(aNomination);
    }
    
    public void doAddPerson(IPerson aPerson)
    {
        this.person = aPerson;
    }
    
    public void doAddTeam(ITeam aTeam)
    {
        this.team = aTeam;
    }

    public void doRemovePerson(IPerson aPerson)
    {
        this.person = null;
    }
 
    public void doRemoveTeam(ITeam aTeam)
    {
        this.team = null;
    }

    public void doRemoveNomination(INomination aNomination)
    {
        this.nominations.remove(aNomination);
    }
    
    // PRINT
    
    public String toString()
    {
        StringBuffer buffy = new StringBuffer(30);
        buffy.append("Team Member: ");
        buffy.append("\nRole: " + this.role);
        buffy.append("\n" + this.securityLevel);
        buffy.append("\n" + this.person);
        buffy.append("\n" + this.team);
        return buffy.toString();
    }

    // EQUALS
    
    public boolean equals(Object anObject)
    {
        if (anObject instanceof TeamMember)
        {
            TeamMember other = (TeamMember)anObject;
            if (!this.role.equals(other.role)) return false;
            if (this.person == null && (other.person != null))
                return false;
            if (this.person != null && (!this.person.equals(other.person)))
                return false;
            if (this.team == null && (other.team != null))
                return false;
            if (this.team != null && (!this.team.equals(other.team)))
                return false;
            return true;
        }
        else return false;
    }
 

    // DETERMINE MINE
    
    public int maxNominationsAllowed()
    {
        if (this.isRoleChair()) return MAX_CHAIR_DOCUMENTS;
        else  return MAX_DOCUMENTS;
    }

    
    /**
      * Check if team member has nominate privilege.
      * Check for nominate bit in privileges byte by doing a 
      * bit-wise AND with nominate  mask. If > 0, got the bit.
      */
    public boolean hasNominatePrivilege()
    {
        return (this.privileges & PRIVILEGES_NOMINATE_MASK) > 0;
    }
    
    /**
      * Check if team member has delete privilege for removing a nomination.
      * Check for delete bit in privileges byte by doing a 
      * bit-wise AND with delete  mask. If > 0, got the bit.
      */
    public boolean hasDeletePrivilege()
    {
        return (this.privileges & PRIVILEGES_DELETE_MASK) > 0;
    }

    /**
      * IPersonProfile service.
      * Valid email check object inherited from person.
      */
    public boolean hasValidEmail()
    {
        return this.person.hasValidEmail();
    }

    // ANALYZE TRANSACTIONS
    
    public int countNominationsPerPeriod()
    {
        return this.countNominationsPerDays(NOMINATIONS_TIME_PERIOD);
    }
    
    public int countNominationsPerDays(int daysInPeriod)
    {
        if (this.nominations.isEmpty()) return 0;
        
        Calendar myCalendar = Calendar.getInstance();
        myCalendar.add(Calendar.DATE, -1 * daysInPeriod);
        Date endDate = myCalendar.getTime();
        
        CollectionSelector selectList = new CollectionSelector()
        {
            public boolean selectBlock(Object listElement, Object keyValue)
            {
                return ((INomination)listElement).isAfter((Date)keyValue);
            }
        };
        Collection nomsInRange = selectList.select(this.nominations, endDate);
        return nomsInRange.size();
}
    
    // CONDUCT BUSINESS -- DOMAIN SERVICES

    public void makeAdmin() throws BusinessRuleException
    { 
        this.doSetRoleAdmin();
        this.grantNominatePrivilege();
        this.revokeDeletePrivilege();
    }

    public void makeChair() throws BusinessRuleException
    { 
        this.doSetRoleChair();
        this.grantNominatePrivilege();
        this.grantDeletePrivilege();
    }

    public void makeMember() throws BusinessRuleException
    { 
        this.doSetRoleMember();
        this.privileges = PRIVILEGES_DEFAULT_MASK;
    }
        
    public void grantNominatePrivilege() throws BusinessRuleException
    {
        this.privileges |= PRIVILEGES_NOMINATE_MASK;
    }
    
    public void grantDeletePrivilege() throws BusinessRuleException
    {
        this.privileges |= PRIVILEGES_DELETE_MASK;
    }
    
    public void revokeNominatePrivilege() throws BusinessRuleException
    {
        if (this.hasNominatePrivilege())
        {
            this.privileges ^= PRIVILEGES_NOMINATE_MASK;
        }
    }
    
    public void revokeDeletePrivilege() throws BusinessRuleException
    {
        if (this.hasNominatePrivilege())
        {
            this.privileges ^= PRIVILEGES_DELETE_MASK;
        }
    }
 
    // COLLABORATION RULES
    
    /**
      * Test if can collaborate with person. 
      * Fail if person does not have valid email.
      */
    public void testAddPerson(IPerson aPerson) throws BusinessRuleException
    {
      if (this.person != null)
      {
        throw new BusinessRuleException("Team member already has a person.");
      }
      if (!aPerson.hasValidEmail())
      {
        throw new BusinessRuleException("Person cannot be team member. Invalid email.");
      }
      if (this.team != null)
      {
        this.testAddPersonTeamConflict(aPerson, this.team);
      }
    }

    public void testAddPersonTeamConflict(IPerson aPerson, ITeam aTeam) throws BusinessRuleException
    {
        ITeamMember aTeamMember = aTeam.getTeamMember(aPerson); 
        if (aTeamMember != null)
        {
            throw new BusinessRuleException("Tried to add person twice to team.");
        }
    }
 
    public void testRemovePerson(IPerson aPerson) throws BusinessRuleException
    {
      if (aPerson == null)
      {
        throw new BusinessRuleException("Tried to remove null person.");
      }
      if (!aPerson.equals(this.person))
      {
        throw new BusinessRuleException("Tried to remove different person.");
      }
      if (this.team !=  null)
      {
        throw new BusinessRuleException("Team member on team cannot remove person.");
      }
    }
 
    public void testAddTeam(ITeam aTeam) throws BusinessRuleException
    {
      if (this.team != null)
      {
        throw new BusinessRuleException("Team member already has a team.");
      }
      if (this.person != null) 
      {
        this.testAddPersonTeamConflict(this.person, aTeam);
      }
    }
     
    public void testRemoveTeam(ITeam aTeam) throws BusinessRuleException
    {
      if (aTeam == null)
      {
        throw new BusinessRuleException("Tried to remove null team.");
      }
      if (!aTeam.equals(this.team))
      {
        throw new BusinessRuleException("Tried to remove different team.");
      }
      if (!this.nominations.isEmpty())
      {
        throw new BusinessRuleException("Cannot remove team member with nominations.");
      }
    }
            
    /**
      * Test if can make nomination. 
      * Fail if do not have nominate privilege.
      * Fail if already nominated maximum per time period.
      */    
    public void testAddNomination(INomination aNomination) throws BusinessRuleException
    {
        if (!this.hasNominatePrivilege())
        {
            throw new BusinessRuleException("Security violation. Team member cannot nominate.");
        }
        if (this.countNominationsPerPeriod() >= this.maxNominationsAllowed())
        {
            throw new BusinessRuleException("Team member cannot nominate. Too many nominations.");
        }
    }    
    
    // PROPERTY RULES
    
    public void testSetRoleChair()throws BusinessRuleException
    {
        if (this.isRoleChair()) return;
        if (this.team != null)
        {
            this.team.testCanBeChair(this);  
        }
    }
           
    // RUN
    
    public static TeamMember testTeamMember() throws BusinessRuleException
    {
        return TeamMember.testChair();
    }
    
    public static TeamMember testChair() throws BusinessRuleException
    {
        ITeam aTeam = Team.testTeam();
        TeamMember aTeamMember = new TeamMember(Person.testPerson(),aTeam );
        aTeamMember.makeChair();
        SecurityLevel sLevel = aTeamMember.getSecurityLevel();
        sLevel.setLevelHigh();
        return aTeamMember;
    }
    
    public static TeamMember testAdmin() throws BusinessRuleException
    {
        ITeam aTeam = Team.testTeam();
        TeamMember aTeamMember = new TeamMember(Person.testPerson(),aTeam );
        aTeamMember.makeAdmin();
        return aTeamMember;
    }

    public static TeamMember testNoNominate() throws BusinessRuleException
    {
        ITeam aTeam = Team.testTeam();
        TeamMember aTeamMember = new TeamMember(Person.testPerson(),aTeam );
        aTeamMember.revokeNominatePrivilege();
        return aTeamMember;
    }
    
    public static TeamMember testSecret() throws BusinessRuleException
    {
        ITeam aTeam = Team.testTeam();
        TeamMember aTeamMember = new TeamMember(Person.testPerson(),aTeam );
        aTeamMember.grantNominatePrivilege();
        SecurityLevel sLevel = aTeamMember.getSecurityLevel();
        sLevel.setLevelSecret();
        return aTeamMember;
    }
                    
}