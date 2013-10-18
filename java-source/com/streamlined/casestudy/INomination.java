package com.streamlined.casestudy;

import java.util.*;
import java.text.*;
import com.streamlined.util.exceptions.*;

public interface INomination extends java.lang.Comparable
{
    // ACCESSORS -- get properties
    public String getComments(); 
    public Date getNominationDate(); 
 
    // ACCESSORS -- get property values
    public boolean isStatusApproved(); 
    public boolean isStatusRejected(); 
    public boolean isStatusPending(); 
    public boolean isStatusInReview(); 
    public boolean notResolved();

    // ACCESSORS -- get collaborators
    public IDocument getDocument(); 
    public ITeamMember getTeamMember(); 
  
    // ACCESSORS -- set properties
    public void setComments(String newComments) throws BusinessRuleException;

    // ACCESSORS -- set property values
    public void setStatusPending() throws BusinessRuleException;
    public void setStatusInReview() throws BusinessRuleException;
    public void setStatusApproved() throws BusinessRuleException;
    public void setStatusRejected() throws BusinessRuleException;

    // ACCESSORS -- add collaborators
    public void addTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;
    public void addDocument(IDocument aDocument) throws BusinessRuleException;
    
    // ACCESSORS -- do adds
    public void doAddDocument(IDocument aDocument);
    public void doAddTeamMember(ITeamMember aTeamMember);

    // DETERMINE MINE
    public boolean isBefore(Date aDate);
    public boolean isAfter(Date aDate);
    
    // COLLABORATION RULES
    public void testAddDocument(IDocument aDocument) throws BusinessRuleException;
    public void testAddTeamMember(ITeamMember aTeamMember) throws BusinessRuleException;
}
