package com.streamlined.casestudy;

import java.util.*;
import java.text.*;
import com.streamlined.util.exceptions.*;

public interface IDocument
{
    // ACCESSORS -- get properties
    public String getTitle();
    public SecurityLevel getSecurityLevel();
    public Date getPublicationDate() throws BusinessRuleException;
    
    // ACCESSORS -- get collaborators
    public List getNominations(); 
  
    // ACCESSORS -- set properties
    public void setTitle(String newTitle) throws BusinessRuleException;
    
    // ACCESSORS -- do adds & removes
    public void doAddNomination(INomination aNomination) ;
    public void doRemoveNomination(INomination aNomination) ;

    // DETERMINE MINE
    public boolean isPublished(); 
    public boolean isApproved(); 

    // ANALYZE TRANSACTIONS
    public INomination getApprovedNomination() throws BusinessRuleException;
    public INomination getLatestNomination() throws BusinessRuleException;
    
    // CONDUCT BUSINESS
    public void nominate(ITeamMember aTeamMember) throws BusinessRuleException;
    public void publish() throws BusinessRuleException;

    // COLLABORATION RULES
    public void testAddNomination(INomination aNomination) throws BusinessRuleException;
    public void testAddNominationConflict(INomination aNomination, ITeamMember aTeamMember) throws BusinessRuleException;
}
            
        
        
        

    