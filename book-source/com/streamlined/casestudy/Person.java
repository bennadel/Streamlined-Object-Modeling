package com.streamlined.casestudy;

import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;
import com.streamlined.util.EmailAddress;

public class Person extends Object implements IPerson
{    
    // DEFINE
    private String name;
    private String title;
    private EmailAddress email;
    private ArrayList teamMembers;
       
    /** Person must have valid name to be created.
      * Email and title are optional
      */
      
    // INITIALIZE
    public Person(String newName) throws BusinessRuleException
    {
        this.setName(newName);
        this.title = new String();
        this.email = new EmailAddress();
        this.teamMembers = new ArrayList();
    }

    // ACCESSORS -- get properties
    
    public String getName()
    {
        return this.name;
    }
    
    public String getTitle()
    {
        return this.title;
    }
    
    public String getEmail()
    {
        return this.email.getAddress();
    }

    // ACCESSORS -- get collaborations
    
    public List getTeamMembers()
    {
        return Collections.unmodifiableList(this.teamMembers);
    }
   
    public ListIterator getTeamMemberList()
    {
        return this.teamMembers.listIterator();
    }
        
    public ITeamMember getTeamMember(ITeam aTeam)
    {
        if (aTeam == null) { return null; }
        
        CollectionDetector tmDetector = new CollectionDetector()
        {
            public boolean detectBlock(Object listElement, Object keyValue)
            {
                ITeamMember aTeamMember = (ITeamMember)listElement;
                return aTeamMember.getTeam().equals(keyValue);
            }
        };
        return (ITeamMember)tmDetector.detect(this.teamMembers, aTeam);
    }
  
    // ACCESSORS -- set properties
    
    /**
      * Set or change a person's name.
      * Fail if the name is null or empty.
      */
    public void setName(String newName) throws BusinessRuleException
    { 
        if ((newName == null) || (newName.length() == 0))
        {
            throw new BusinessRuleException("Person name cannot be null or empty. ");
        }
        this.name = newName;
    }

    /**
      * Set or change the person's email.
      * Fail if the email is null or empty.
      */    
    public void setEmail(String newEmail) throws BusinessRuleException
    { 
        this.email.setAddress(newEmail);
    }
    
    /**
      * Remove person's email by setting back
      * to NO_ADDRESS.
      */    
    public void removeEmail( ) throws BusinessRuleException
    { 
        this.email.setAddressEmpty();
    }

    /**
      * Set or change the person's title.
      * Fail if the title is null.
      */    
    public void setTitle(String newTitle) throws BusinessRuleException
    { 
        if (newTitle == null) 
        {
            throw new BusinessRuleException("Person cannot have null title.");
        }
        this.title = newTitle;
    }
 
    // ACCESSORS -- add collaborators

    public void addTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    { 
        if (aTeamMember == null)
        {
            throw new BusinessRuleException("Person tried to add null team member.");
        }
        aTeamMember.addPerson(this);
    }
  
    public void removeTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    { 
        if (aTeamMember == null)
        {
            throw new BusinessRuleException("Person tried to remove null team member.");
        }
        aTeamMember.removePerson(this);
    }
    
    // ACCESSORS -- do adds
    
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
        StringBuffer buffy = new StringBuffer(60);
        buffy.append("Person: ");
        buffy.append("\nName: " + this.name);
        buffy.append("\nTitle: " + this.title);
        buffy.append("\nEmail: " + this.email);
        return buffy.toString();
    }
     
    // EQUALS
    
    public boolean equals(Object anObject)
    {
        if (anObject instanceof Person)
        {
            Person other = (Person)anObject;
            if (!this.name.equals(other.name)) return false;
            if (!this.email.equals(other.email)) return false;
            if (!this.title.equals(other.title)) return false;
            return true;
        }          
        return false;
    }
            
    // RUN
    
    public static Person testPerson() throws BusinessRuleException
    {
        Person aPerson = new Person("Alfred E. Neumann");
        aPerson.setEmail("al@neumann.com");
        aPerson.setTitle("Sr. GUI Officer");
        return aPerson;
    }

    // DETERMINE MINE
    
    public boolean hasValidEmail()
    {
        return this.email != null;
    }
    
 }