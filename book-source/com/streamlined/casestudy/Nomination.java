package com.streamlined.casestudy;

import java.util.*;
import java.text.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

public class Nomination extends Object implements INomination
{
    // DEFINE
    private String comments;
    private NominationStatus status;
    private Date nominationDate;
    private IDocument document;
    private ITeamMember teamMember;

    /**
      * Little static inner class, beause Java lacks key-value pair utility class.
      * Associates a string to a numeric code. 
      * Use string for nice display.
      * Use numeric code for quick comparisions.
      */
    private static class NominationStatus
    {
        private int code;
        private String status;
        
        NominationStatus(int statusCode, String statusString)
        {
            this.code = statusCode;
            this.status = statusString;
        }
        
        public int getCode( ) { return this.code; }
        public String toString(){ return this.status; }
        public boolean equals(Object anObject)
        {
            if (anObject instanceof NominationStatus)
                return (this.code == ((NominationStatus)anObject).getCode());
            else return false;
        }
    }
    
    /**
      * Four states of a nomination.
      * Starts life in the pending state.
      * Can move from pending to in review and back again.
      * Can move from in review to approved or rejected.
      * Cannot move from pending to approved or rejected.
      * Cannot move from approved to rejected, pending, or in review.
      * Cannot move from rejected to approved, pending, or in review.
      */
    private static NominationStatus STATUS_PENDING = new NominationStatus(0, "pending");
    private static NominationStatus STATUS_IN_REVIEW = new NominationStatus(1, "in review");
    private static NominationStatus STATUS_REJECTED = new NominationStatus(2, "rejected");
    private static NominationStatus STATUS_APPROVED = new NominationStatus(3, "approved");
           
    
    // INITIALIZE
    /**
      * Create a new nomination for a document by a team member.
      * Adds team member first. If adding document causes exception, then remove
      * the team member, and throw the original exception.
      */
    public Nomination(IDocument aDocument, ITeamMember aTeamMember) throws BusinessRuleException
    {
        this.status = STATUS_PENDING;
        this.nominationDate = new Date();
        this.comments = new String();
        this.addTeamMember(aTeamMember);
        try
        {
            this.addDocument(aDocument);
        }
        catch(BusinessRuleException excptn)
        {
            aTeamMember.doRemoveNomination(this);
            throw excptn;
        }
    }
      
    // ACCESSORS -- get properties
    
    public String getComments() 
    {
        return this.comments;
    }
        
    public Date getNominationDate() 
    {
        return this.nominationDate;
    }

    // ACCESSORS -- get property values

    public boolean isStatusApproved() 
    {
        return this.status.equals(STATUS_APPROVED);
    }
 
    public boolean isStatusRejected() 
    {
        return this.status.equals(STATUS_REJECTED);
    }
    
    public boolean isStatusPending() 
    {
        return this.status.equals(STATUS_PENDING);
    }
    
    public boolean isStatusInReview() 
    {
        return this.status.equals(STATUS_IN_REVIEW);
    }
 
    // ACCESSORS -- get collaborators
    
    public IDocument getDocument() 
    {
        return this.document;
    }
    
    public ITeamMember getTeamMember() 
    {
        return this.teamMember;
    }
  
    // ACCESSORS -- set properties
    
    public void setComments(String newComments) 
    {
        this.comments = newComments;
    }
    
    // ACCESSORS -- set property values
    
    /**
      * Set status to pending. Fail unless in review or already pending.
      */
    public void setStatusPending() throws BusinessRuleException
    {
        this.testSetStatusPending();
        this.doSetStatus(STATUS_PENDING);
    }
    
    /**
      * Set status to in review. Fail unless pending or already in review.
      */
    public void setStatusInReview() throws BusinessRuleException
    {
        this.testSetStatusInReview();
        this.doSetStatus(STATUS_IN_REVIEW);
    }

    /**
      * Set status to approved. Fail unless in review or already approved.
      */
    public void setStatusApproved() throws BusinessRuleException
    {
        this.testSetStatusApproved();
        this.doSetStatus(STATUS_APPROVED);
    }

    /**
      * Set status to rejected. Fail unless in review or already rejected.
      */
    public void setStatusRejected() throws BusinessRuleException
    {
        this.testSetStatusRejected();
        this.doSetStatus(STATUS_REJECTED);
    }
    
    // ACCESSORS -- add collaborators
   
    /**
      * Add a team member. Fail if null or collaboration rules fail.
      */
    public void addTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (aTeamMember == null)
        {
            throw new BusinessRuleException("Tried to add nil team member");
        }
        this.testAddTeamMember(aTeamMember);
        aTeamMember.testAddNomination(this);
        this.doAddTeamMember(aTeamMember);
        aTeamMember.doAddNomination(this);
    }

    /**
      * Add a document. Fail if null or collaboration rules fail.
      */
    public void addDocument(IDocument aDocument) throws BusinessRuleException
    {
        if (aDocument == null)
        {
            throw new BusinessRuleException("Tried to add nil document");
        }
        this.testAddDocument(aDocument);
        aDocument.testAddNomination(this);
        this.doAddDocument(aDocument);
        aDocument.doAddNomination(this);
    }
    
    // ACCESSORS -- do sets
    
    public void doSetStatus(NominationStatus aStatus)
    {
        this.status = aStatus;
    }
 
    // ACCESSORS -- do adds
    
    public void doAddDocument(IDocument aDocument)
    {
        this.document = aDocument;
    }
    
    public void doAddTeamMember(ITeamMember aTeamMember)
    {
        this.teamMember = aTeamMember;
    }

    // PRINT
    
    public String toString()
    {
        DateFormat aDateFormat = DateFormat.getDateTimeInstance();
        StringBuffer buffy = new StringBuffer(30);
        buffy.append("Nomination on: ");
        buffy.append(aDateFormat.format(this.nominationDate));
        buffy.append("\nStatus: " + this.status);
        buffy.append("\n" + this.document);
        buffy.append("\n" + this.teamMember);
        return buffy.toString();
    }
    
    // EQUALS
    
    public boolean equals(Object anObject)
    {
        if (anObject instanceof Nomination)
        {
            Nomination other = (Nomination)anObject;
            if (!this.status.equals(other.status)) 
                return false;
            if (!this.nominationDate.equals(other.nominationDate))
                return false;
            if (this.document == null && (other.document != null))
                return false;
            if (this.document != null && (!this.document.equals(other.document)))
                return false;
            if (this.teamMember == null && (other.teamMember != null))
                return false;
            if (!this.teamMember.equals(other.teamMember))
                return false;
            return true;
        }
        else return false;
    }
    
    
    // DETERMINE MINE
    
    public boolean isBefore(Date aDate)
    { 
        return this.nominationDate.before(aDate);
    }
    
    public boolean isAfter(Date aDate)
    { 
        return this.nominationDate.after(aDate);
    }
    
    public boolean notResolved()
    {
        return (this.isStatusPending() || this.isStatusInReview());
    }
        
        
    // COLLABORATION RULES
    
    /**
      * Test if can add document. 
      * Fail if already have document or team member conflicts with it.
      */
    public void testAddDocument(IDocument aDocument) throws BusinessRuleException
    {
        if (this.document != null)
        {
            throw new BusinessRuleException("Document already exists.");
        }

        if (this.teamMember != null)
        {
            aDocument.testAddNominationConflict(this, this.teamMember);
        }
    }
    
    /**
      * Test if can add team member. 
      * Fail if already have team member or document conflicts with it.
      */
    public void testAddTeamMember(ITeamMember aTeamMember) throws BusinessRuleException
    {
        if (this.teamMember != null)
        {
            throw new BusinessRuleException("Team member already exists.");
        }

        if (this.document != null)
        {
            this.document.testAddNominationConflict(this, aTeamMember);
        }
    }

    // PROPERTY RULES    
    
    public void testSetStatusPending() throws BusinessRuleException
    {
        if (this.notResolved()) return;
        else
        {
            throw new BusinessRuleException("Nomination already resolved. Cannot make pending.");
        }
    }

    public void testSetStatusInReview() throws BusinessRuleException
    {
        if (this.notResolved()) return;
        else
        {
            throw new BusinessRuleException("Nomination already resolved. Cannot make in review.");
        }        
    }
 
    public void testSetStatusApproved() throws BusinessRuleException
    {
        if (this.isStatusInReview() || this.isStatusApproved()) return;
        else
        {
            throw new BusinessRuleException("Nomination cannot be approved. Not under review");
        }     
    }
    
    public void testSetStatusRejected() throws BusinessRuleException
    {
        if (this.isStatusInReview() || this.isStatusRejected()) return;
        else
        {
            throw new BusinessRuleException("Nomination cannot be rejected. Not under review");
        }        
    }
    
   
   // UTILITY
   
    /**
      * Compare against another object. 
      * Runtime error if object is not a nomination.
      */
    public int compareTo(Object anObject)
    {
        return this.compareTo((Nomination)anObject);
    }
    
    /**
      * Compare against another nomination. 
      * This ordering allows sort to have most recent first.
      * @return -1 if this nomination is more recent than a nomination.
      * @return  0 if this nomination is on same date as a nomination.
      * @return  1 if this nomination is before a nomination.
      */
    public int compareTo(Nomination aNomination)
    {
        return aNomination.nominationDate.compareTo(this.nominationDate);
    }
    
    // RUN
    public static Nomination testNomination() throws BusinessRuleException
    {
        Calendar myCalendar = Calendar.getInstance();
        myCalendar.add(Calendar.DATE, -35);
        ITeamMember aTeamMember = TeamMember.testTeamMember();
        Nomination aNomination = new Nomination(Document.testDocument(), aTeamMember);
        aNomination.nominationDate = myCalendar.getTime();
        return aNomination;
    }
        
    public static Nomination testOldNomination(ITeamMember aTeamMember) throws BusinessRuleException
    {
        Calendar myCalendar = Calendar.getInstance();
        myCalendar.add(Calendar.DATE, -35);
        Nomination aNomination = new Nomination(Document.testDocument(), aTeamMember);
        aNomination.nominationDate = myCalendar.getTime();
        return aNomination;
    }
      
}
