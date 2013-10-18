package com.streamlined.casestudy;

import java.util.*;
import java.text.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

public class Document extends Object implements IDocument
{
    // DEFINE
    private String title;
    private Date publicationDate;
    private SecurityLevel securityLevel;
    private TreeSet nominations;    
   
    // INITIALIZE
    
    /**
      * Create a document with a title and default security level.
      * Fail if title is not valid.
      */
    public Document(String newTitle) throws BusinessRuleException
    {
        this.setTitle(newTitle);
        this.publicationDate = null;
        this.securityLevel = new SecurityLevel();
        this.nominations = new TreeSet();
    }
  
    // ACCESSORS -- get properties
    
    public String getTitle() 
    {
        return this.title;
    }
    
    public SecurityLevel getSecurityLevel() 
    {
        return this.securityLevel;
    }
    
    public Date getPublicationDate() throws BusinessRuleException
    {
        if (this.publicationDate == null)
        {
            throw new BusinessRuleException("Document is unpublished.");
        }
        else 
        {
            return this.publicationDate;
        }
    }
    
    // ACCESSORS -- get collaborators

    /**
      * Return nominations as list.
      * Create list from sorted set of nominations.
      * Return unmodifiable version of the list.
      */
    public List getNominations() 
    {
        final ArrayList newList = new ArrayList();
        CollectionPerformer aPerformer = new CollectionPerformer()
        {
            public void performBlock(Object listElement, Object keyValue)
            {
                newList.add(listElement);
            }
        };
        aPerformer.perform(this.nominations);
        return Collections.unmodifiableList(newList);
    }

    /**
      * Return nominations iterator. 
      * Allows subclasses to edit set.
      */
    protected Iterator getNominationsSet() 
    {
        return this.nominations.iterator();
    }

  
    // ACCESSORS -- set properties
    
    /**
      * Set or change the document's title.
      * Logic Rule: Fail if the title is null or empty.
      * Business Rule: Fail if the title is > 255 characters.
      */
    public void setTitle(String newTitle) throws BusinessRuleException
    {
        if ((newTitle == null) || (newTitle.length() == 0))
        {
            throw new BusinessRuleException("Document cannot have null or empty title.");
        }
        this.testSetTitle(newTitle);
        this.doSetTitle(newTitle);
    }        
        
    // ACCESSORS -- do sets
    
    /**
      * Set title property variable.
      */
    public void doSetTitle(String newTitle) 
    {
        this.title = newTitle;
    }
 
    public void doSetPublicationDate(Date newDate) 
    {
        this.publicationDate = newDate;
    }
 
    // ACCESSORS -- do adds & removes
    // these are public..so can allow collaborators to be in different packages.
    // later have to be public so can use interfaces
    
    /**
      * Add a new nomination. Mark nominations as needing resort.
      */
    public void doAddNomination(INomination aNomination) 
    {
        this.nominations.add(aNomination);
    }

    public void doRemoveNomination(INomination aNomination) 
    {
        this.nominations.remove(aNomination);
    }

    // PRINT
    
    public String toString()
    {
        StringBuffer buffy = new StringBuffer(30);
        buffy.append("Document: " + this.title);
        if (this.isPublished())
        {
            DateFormat aDateFormat = DateFormat.getDateTimeInstance();
            System.out.println("published on " + aDateFormat.format(this.publicationDate));
        }
        buffy.append("\n"+  this.securityLevel);
        return buffy.toString();
    }
    
    // EQUALS
    
    public boolean equals(Object anObject)
    {
        if (anObject instanceof Document)
        {
            Document other = (Document)anObject;
            return this.title.equals(other.title);
        }
        else return false;
    }
    
    // DETERMINE MINE
    
    public boolean isPublished() 
    {
        try
        {
            this.getPublicationDate();
        }
        catch(BusinessRuleException ex)
        {
            return false;
        }
        return true;
    }
    
    public boolean isApproved() 
    {
        try
        {
            this.getApprovedNomination();
        }
        catch(BusinessRuleException ex)
        {
            return false;
        }
        return true;
    }

    // ANALYZE TRANSACTIONS

    /**
      * Return the approved nomination or throw exception if none.
      */
    public INomination getApprovedNomination() throws BusinessRuleException
    {
        CollectionDetector approvedDetector = new CollectionDetector()
        {
            public boolean detectBlock(Object listElement, Object keyValue)
            {
                return ((INomination)listElement).isStatusApproved();
            }
        };
        INomination aNomination = (INomination)approvedDetector.detect(this.nominations);
        if (aNomination == null)
        {
            throw new BusinessRuleException("Document has no approved nomination.");
        }
        return aNomination;
    }

    /**
      * Return the latest nomination or throw exception if no nominations.
      */
    public INomination getLatestNomination() throws BusinessRuleException
    {
        if (this.nominations.isEmpty())
        {
            throw new BusinessRuleException("Document has no nominations"); 
        }
        return (INomination)(this.nominations.first());
    }
    
    
    // CONDUCT BUSINESS
    
    /**
      * Document is being nominated by a team member.
      * Create new nomination.
      * Fail if collaboration rules not met.
      */    
    public void nominate(ITeamMember aTeamMember) throws BusinessRuleException
    {
        this.createNomination(aTeamMember);
    }
    
    /**
      * Publish document. Set publication date.
      * Fail if already published.
      * Fail if document does not have an approved nomination.
      */
    public void publish() throws BusinessRuleException
    {
      this.testSetPublicationDate();
      this.doSetPublicationDate(new Date());
    }

    // COLLABORATION RULES
    
    /**
      * Test if can add nomination. 
      * Fail if already published.
      * Fail if has unresolved nomination.
      * Fail if a nomination is before document's last nomination.
      * Fail if not enough time since last nomination.
      */
    public void testAddNomination(INomination aNomination) throws BusinessRuleException
    {
        if (this.isPublished())
        {
            throw new BusinessRuleException("Document already published.");
        }
        
        INomination lastNomination = null;
        try
        {
            lastNomination = this.getLatestNomination();
        }
        catch(BusinessRuleException ex)
        {
            // lastNomination is null. ok to nominate
            return;
        }
         
        if (lastNomination.isStatusPending() || lastNomination.isStatusInReview())
        {
            throw new BusinessRuleException("Nomination denied. Document has unresolved nomination.");
        }
    }

    /**
      * Test for conflict with team member making a nomination. 
      * Fail if my security level is greater than team member's security level.
      */
    public void testAddNominationConflict(INomination aNomination, ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (this.securityLevel.greaterThan(aTeamMember.getSecurityLevel()))
        {
            throw new BusinessRuleException("Security violation. Team member has improper security.");
        }
    }
    
    // PROPERTY RULES
    
    public void testSetTitle(String newTitle) throws BusinessRuleException
    {
      if (newTitle.length() > 255)
      {
        throw new BusinessRuleException("Document title cannot be longer than 255 characters");
      }
    }
    
    public void testSetPublicationDate() throws BusinessRuleException
    {
        if (this.isPublished())
        {
            throw new BusinessRuleException("Document already published.");
        }
        
        if (!this.isApproved())
        {
            throw new BusinessRuleException("Document not approved for publication.");
        }
    }
    
    
    // PRIVATE 
    
    /**
      * Creates and returns a new nomination.
      * Fail if collaboration rules not met.
      */
    private INomination createNomination(ITeamMember aTeamMember)  throws BusinessRuleException
    {
        return new Nomination(this, aTeamMember);
    }
    
    
    // RUN
    
    public static Document testDocument() throws BusinessRuleException
    {
        Document aDocument = new Document("1001 Ways to Build Object Models" );
        return aDocument;
    }      
    
    public static Document testSecret() throws BusinessRuleException
    {
        Document aDocument = new Document("Food and Beverage Industry Surveillance Tips" );
        SecurityLevel sLevel = aDocument.getSecurityLevel();
        sLevel.setLevelSecret();
        return aDocument;
    }      

}
            
        
        
        

    